import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateNameUseCase from './UpdateNameUseCase';


class UpdateNameController {

	public async handle(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { id } = request.user;

		const { name } = request.body

		const updateNameUseCase = container.resolve(UpdateNameUseCase);

		const updatedName = await updateNameUseCase.execute({user_id: id, name});

		return response.json(updatedName);
	}
}

export { UpdateNameController }
