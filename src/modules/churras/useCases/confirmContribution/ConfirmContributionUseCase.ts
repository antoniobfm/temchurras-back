import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import IChurrasRepository from "@modules/churras/repositories/IChurrasRepository";
import { IChurrasPresenceRepository } from "@modules/churras/repositories/IChurrasPresenceRepository";

interface IRequest {
	user_id: string;
	churras_id: string;
	contributor_id: string;
	amount_contributed: number;
}

@injectable()
class ConfirmContributionUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("ChurrasRepository")
        private churrasRepository: IChurrasRepository,

        @inject("ChurrasPresenceRepository")
        private churrasPresenceRepository: IChurrasPresenceRepository,
    ) {}

    async execute({
			user_id,
			churras_id,
			contributor_id,
			amount_contributed
		}: IRequest): Promise<{id: string}> {
			const user = await this.usersRepository.findById(user_id);

			if (!user) {
				throw new AppError('User doesnt exist');
			}

			const churras = await this.churrasRepository.findById(churras_id);

			if (!churras || churras.creator_id !== user.id) {
				throw new AppError('Churras doesnt exist');
			}

			const confirmedPresence = await this.churrasPresenceRepository.findByUserIdAndChurrasId(contributor_id, churras_id);

			if (!confirmedPresence) {
				throw new AppError('User doesnt participate in this churras');
			}

			confirmedPresence.amount_contributed = amount_contributed;

			const newConfirmedPresence = await this.churrasPresenceRepository.save(confirmedPresence);

			return newConfirmedPresence;
    }
}

export { ConfirmContributionUseCase };
