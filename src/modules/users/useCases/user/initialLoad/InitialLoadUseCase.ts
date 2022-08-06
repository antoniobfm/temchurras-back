import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

interface IChurras {
    id: string;
    name: string;
    description: string;
    date: Date;
		contact_number: string;
    suggested_contribution_with_drinks: number;
    suggested_contribution_without_drinks: number;
    pix_key: string;
    pix_type: string;
    total_participants: number;
    total_revenue: number;
}

interface IResponse {
	id: string;
	name?: string;
	phone_number: string;

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
class InitialLoadUseCase {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	public async execute(user_id: string): Promise<IResponse> {
		const user = await this.usersRepository.findById(user_id);

		if (!user) {
			throw new AppError('User not found');
		}

		const allChurras: IChurras[] = [];

		const churrasCalendar = user.churras_presence.map((churras) => {
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
				total_revenue: churras.churras.churras_presence ? churras.churras.churras_presence.reduce((total, presence) => !!presence.amount_contributed ? total + parseFloat(`${presence.amount_contributed}`) : total, 0) : 0
			}

			console.log(churras.churras.churras_presence)

			allChurras.push(churrasData);

			return {
				id: churras.churras_id,
				amount_contributed: churras.amount_contributed,
			}
		});

		const churrasOrganizing = user.organizing.map((churras) => {
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
				total_revenue: churras.churras_presence ? churras.churras_presence.reduce((total, presence) => total + parseFloat(`${presence.amount_contributed}`), 0) : 0
			}

			const isThisChurrasInAllChurras = allChurras.findIndex((churras) => churras.id === churrasData.id) !== -1;

			if(!isThisChurrasInAllChurras) {
				allChurras.push(churrasData);
			}

			return {
				id: churras.id,
				presence_list: churras.churras_presence.map(presence => {
					return {
						id: presence.user.id,
						name: presence.user.name,
						amount_contributed: parseFloat(`${presence.amount_contributed}`),
					}
				}
				)
			}
		});

		return {
			id: user.id,
			name: user.name,
			phone_number: user.phone_number,
			churras: allChurras,
			calendar: churrasCalendar,
			organizing: churrasOrganizing
		};
	}
}

export default InitialLoadUseCase;
