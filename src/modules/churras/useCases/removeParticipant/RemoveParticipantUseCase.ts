import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import IChurrasRepository from "@modules/churras/repositories/IChurrasRepository";
import Churras from "@modules/churras/infra/typeorm/entities/Churras";
import { IChurrasPresenceRepository } from "@modules/churras/repositories/IChurrasPresenceRepository";
import ChurrasPresence from "@modules/churras/infra/typeorm/entities/ChurrasPresence";

interface IRequest {
	user_id: string;
	churras_id: string;
	participant_id: string;
}

@injectable()
class RemoveParticipantUseCase {
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
			participant_id
		}: IRequest): Promise<{churras_id: string, participant_id: string}> {
			const user = await this.usersRepository.findById(user_id);

			if (!user) {
				throw new AppError('User doesnt exist');
			}

			const churras = await this.churrasRepository.findById(churras_id);

			if (!churras || churras.creator_id !== user_id) {
				throw new AppError('Churras doesnt exist');
			}

			const participant_presence = await this.churrasPresenceRepository.findByUserIdAndChurrasId(participant_id, churras_id);

			if (!participant_presence) {
				throw new AppError('User is not confirmed');
			}

			await this.churrasPresenceRepository.delete(participant_presence);

			return {churras_id: churras_id, participant_id};
    }
}

export { RemoveParticipantUseCase };
