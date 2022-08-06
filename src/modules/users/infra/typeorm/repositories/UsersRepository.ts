import { getRepository, Repository } from 'typeorm';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { ICreateUserDTO } from '@modules/users/dtos/Users/ICreateUserDTO';


import { User } from '../entities/User';

class UsersRepository implements IUsersRepository {
	private ormRepository: Repository<User>;

	constructor() {
		this.ormRepository = getRepository(User);
	}

	public async findById(id: string): Promise<User | undefined> {
		const user = await this.ormRepository.findOne(id, {
			relations: ['organizing', 'organizing.churras_presence', 'organizing.churras_presence.user', 'churras_presence', 'churras_presence.churras', 'churras_presence.churras.creator', 'churras_presence.churras.churras_presence']
		});

		return user;
	}

	public async findByPhoneNumber(phone_number: string): Promise<User | undefined> {
		const user = await this.ormRepository.findOne({
			where: { phone_number },
			relations: ['organizing', 'organizing.churras_presence', 'organizing.churras_presence.user', 'churras_presence', 'churras_presence.churras', 'churras_presence.churras.creator', 'churras_presence.churras.churras_presence']
		});

		return user;
	}

	public async create(data: ICreateUserDTO): Promise<User> {
		const user = this.ormRepository.create({
			phone_number: data.phone_number,
		});

		await this.ormRepository.save(user);

		return user;
	}

	public async save(user: User): Promise<User> {
		return this.ormRepository.save(user);
	}
}

export default UsersRepository;
