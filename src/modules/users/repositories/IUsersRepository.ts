import { ICreateUserDTO } from '../dtos/Users/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

interface IUsersRepository {
	create(data: ICreateUserDTO): Promise<User>;

	findById(id: string): Promise<User | undefined>;
	findByPhoneNumber(phone_number: string): Promise<User | undefined>;

	save(data: User): Promise<User>;
}

export { IUsersRepository };
