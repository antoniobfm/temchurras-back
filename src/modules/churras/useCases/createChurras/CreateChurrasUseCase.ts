import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import IChurrasRepository from "@modules/churras/repositories/IChurrasRepository";
import Churras from "@modules/churras/infra/typeorm/entities/Churras";

interface IRequest {
	creator_id: string;

	name: string;
	description: string;
	date: Date;

	suggested_contribution_with_drinks: number;
	suggested_contribution_without_drinks: number;

	pix_key: string;
	pix_type: string;
}

@injectable()
class CreateChurrasUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("ChurrasRepository")
        private churrasRepository: IChurrasRepository,
    ) {}

    async execute({
			creator_id,

			name,
			description,
			date,

			suggested_contribution_with_drinks,
			suggested_contribution_without_drinks,

			pix_key,
			pix_type
		}: IRequest): Promise<Churras> {
			const user = await this.usersRepository.findById(creator_id);

			if (!user) {
				throw new AppError('User doesnt exist');
			}

			const churras = await this.churrasRepository.create({
				creator_id,

				name,
				description,
				date,

				suggested_contribution_with_drinks,
				suggested_contribution_without_drinks,

				pix_key,
				pix_type
			})

			return churras;
    }
}

export { CreateChurrasUseCase };
