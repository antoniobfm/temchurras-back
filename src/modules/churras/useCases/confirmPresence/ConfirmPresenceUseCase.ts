import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import IChurrasRepository from "@modules/churras/repositories/IChurrasRepository";
import { IChurrasPresenceRepository } from "@modules/churras/repositories/IChurrasPresenceRepository";

interface IRequest {
	user_id: string;
	churras_id: string;
}

@injectable()
class ConfirmPresenceUseCase {
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
		}: IRequest): Promise<{id: string, user_id: string, name?: string}> {
			const user = await this.usersRepository.findById(user_id);

			if (!user) {
				throw new AppError('User doesnt exist');
			}

			const churras = await this.churrasRepository.findById(churras_id);

			if (!churras) {
				throw new AppError('Churras doesnt exist');
			}

			const isPresenceAlreadyConfirmed = await this.churrasPresenceRepository.findByUserIdAndChurrasId(user_id, churras_id);

			if (isPresenceAlreadyConfirmed) {
				throw new AppError('User is already confirmed');
			}

			await this.churrasPresenceRepository.create({
				user_id,
				churras_id,
			});

			return {id: churras_id, user_id: user.id, name: user.name};
    }
}

export { ConfirmPresenceUseCase };
