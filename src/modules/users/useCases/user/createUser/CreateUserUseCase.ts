import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { User } from '@modules/users/infra/typeorm/entities/User';


interface IRequest {
	phone_number: string;
}

@injectable()
class CreateUserUseCase {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	public async execute({
		phone_number
	}: IRequest): Promise<User> {
		// formats phone number input
		const formatPhoneNumber = `+55${phone_number.replace(/[^0-9]/g, '')}`;

		// checks if phone number already exists
		const userExists = await this.usersRepository.findByPhoneNumber(formatPhoneNumber);

		if (userExists) {
			throw new AppError('Phone Number already in use');
		}

		// Creates account
		const user = await this.usersRepository.create({
			phone_number: formatPhoneNumber,
		});

		return user;
	}
}

export default CreateUserUseCase;
