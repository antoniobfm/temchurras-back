import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { IVerificationCodesRepository } from '@modules/users/repositories/IVerificationCodesRepository';
import { sign } from "jsonwebtoken";

import auth from "@config/auth";
import { IUsersTokensRepository } from '@modules/users/repositories/IUserTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IRequest {
	phone_number: string;
}

interface IChurras {
	id: string;
	name: string;
	description: string;
	date: Date;
	suggested_contribution_with_drinks: number;
	suggested_contribution_without_drinks: number;
	pix_key: string;
	pix_type: string;
	total_participants: number;
	total_revenue: number;
}

interface IResponse {
	token: string;
	refresh_token: string;
	user: {
    id: string;
    name?: string;
    phone_number: string;
	};

	churras: IChurras[];

	calendar: {
		id: string
		amount_contributed?: number;
	}[];

	organizing: {
		id: string;
		presence_list: {
			id: string;
			name?: string;
			contribution?: number;
		}[];
	}[];
}

@injectable()
class AuthenticateUseCase {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject("UsersTokensRepository")
		private usersTokensRepository: IUsersTokensRepository,

		@inject("DayjsDateProvider")
		private dateProvider: IDateProvider,
	) { }

	public async execute({ phone_number }: IRequest): Promise<IResponse> {
		// formats phone number input
		const formatPhoneNumber = `+55${phone_number.replace(/[^0-9]/g, '')}`;

		const user = await this.usersRepository.findByPhoneNumber(formatPhoneNumber);

		if (!user) {
			throw new AppError('User not found', 401);
		}

		const allChurras: IChurras[] = [];

		const churrasCalendar = user.churras_presence && user.churras_presence.map((churras) => {
			const churrasData = {
				id: churras.churras_id,
				name: churras.churras.name,
				description: churras.churras.description,
				contact_number: churras.churras.creator.phone_number,
				date: churras.churras.date,
				suggested_contribution_with_drinks: churras.churras.suggested_contribution_with_drinks,
				suggested_contribution_without_drinks: churras.churras.suggested_contribution_without_drinks,
				pix_key: churras.churras.pix_key,
				pix_type: churras.churras.pix_type,
				total_participants: churras.churras.churras_presence ? churras.churras.churras_presence.length : 0,
				total_revenue: churras.churras.churras_presence ? churras.churras.churras_presence.reduce((total, presence) => presence.amount_contributed ? total + parseFloat(`${presence.amount_contributed}`) : total + 0, 0) : 0
			}

			allChurras.push(churrasData);

			return {
				id: churras.churras_id,
				amount_contributed: churras.amount_contributed,
			}
		});

		const churrasOrganizing = user.organizing && user.organizing.map((churras) => {
			const churrasData = {
				id: churras.id,
				name: churras.name,
				description: churras.description,
				contact_number: user.phone_number,
				date: churras.date,
				suggested_contribution_with_drinks: churras.suggested_contribution_with_drinks,
				suggested_contribution_without_drinks: churras.suggested_contribution_without_drinks,
				pix_key: churras.pix_key,
				pix_type: churras.pix_type,
				total_participants: churras.churras_presence ? churras.churras_presence.length : 0,
				total_revenue: churras.churras_presence ? churras.churras_presence.reduce((total, presence) => presence.amount_contributed ? total + parseFloat(`${presence.amount_contributed}`) : total + 0, 0) : 0
			}

			allChurras.push(churrasData);

			return {
				id: churras.id,
				presence_list: churras.churras_presence && churras.churras_presence.map(presence => {
					return {
						id: presence.user.id,
						name: presence.user.name,
						amount_contributed: presence.amount_contributed,
					}
				}
				)
			}
		});

		const {
			secret_token,
			secret_refresh_token,
			expires_in_token,
			expires_in_refresh_token,
			expires_refresh_token_days,
		} = auth;

		// Gerar jsonwebtoken
		const token = sign({}, secret_token, {
			subject: user.id,
			expiresIn: expires_in_token,
		});

		const refresh_token = sign({ formatPhoneNumber }, secret_refresh_token, {
			subject: user.id,
			expiresIn: expires_in_refresh_token,
		});

		const refresh_token_expires_date = this.dateProvider.addDays(
			expires_refresh_token_days
		);

		await this.usersTokensRepository.create({
			user_id: user.id,
			refresh_token,
			expires_date: refresh_token_expires_date,
		});

		const tokenReturn: IResponse = {
				token,
				refresh_token,
				user: {
					id: user.id,
					name: user.name,
					phone_number: user.phone_number,
				},
				churras: allChurras,
				calendar: churrasCalendar,
				organizing: churrasOrganizing
		};

		return tokenReturn;
	}
}

export { AuthenticateUseCase };
