import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

interface IRequest {
	user_id: string;
	name: string;
}

interface IResponse {
	name: string;
}

@injectable()
class UpdateNameUseCase {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	public async execute({user_id, name}: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findById(user_id);

		if (!user) {
			throw new AppError('User not found');
		}

		const updatedUser = {
			...user,
			name
		}

		await this.usersRepository.save(updatedUser);

		return {
			name: updatedUser.name,
		};
	}
}

export default UpdateNameUseCase;
