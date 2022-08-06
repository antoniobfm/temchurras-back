import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserUseCase from './CreateUserUseCase';


class CreateUserController {

	public async handle(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { phone_number } = request.body;

		const createUserUseCase = container.resolve(CreateUserUseCase);

		const createUser = await createUserUseCase.execute({
			phone_number
		});

		return response.json(createUser);
	}
}

export { CreateUserController }
