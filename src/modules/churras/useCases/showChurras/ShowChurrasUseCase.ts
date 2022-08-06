import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import IChurrasRepository from "@modules/churras/repositories/IChurrasRepository";
import Churras from "@modules/churras/infra/typeorm/entities/Churras";

interface IRequest {
	churras_id: string;
}

interface IResponse {
  id: string;
  name: string;
  description: string;
	contact_number: string;
  date: Date;
  suggested_contribution_with_drinks: number;
  suggested_contribution_without_drinks: number;
  pix_key: string;
  pix_type: string;

	total_participants: number;
	total_revenue: number;
}

@injectable()
class ShowChurrasUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("ChurrasRepository")
        private churrasRepository: IChurrasRepository,
    ) {}

    async execute({
			churras_id
		}: IRequest): Promise<IResponse> {
			const churras = await this.churrasRepository.findById(churras_id);

			if (!churras) {
				throw new AppError('Churras was not found');
			}

			return {
				id: churras.id,
				name: churras.name,
				description: churras.description,
				contact_number: churras.creator.phone_number,
				date: churras.date,

				suggested_contribution_with_drinks: churras.suggested_contribution_with_drinks,
				suggested_contribution_without_drinks: churras.suggested_contribution_without_drinks,

				pix_key: churras.pix_key,
				pix_type: churras.pix_type,

				total_participants: churras.churras_presence ? churras.churras_presence.length : 0,
				total_revenue: churras.churras_presence ? churras.churras_presence.reduce((total, presence) => !!presence.amount_contributed ? total + parseFloat(`${presence.amount_contributed}`) : total, 0) : 0
			}
    }
}

export { ShowChurrasUseCase };
