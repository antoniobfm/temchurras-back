import { Request, Response } from 'express';
import { container } from 'tsyringe';
import InitialLoadUseCase from './InitialLoadUseCase';


class InitialLoadController {

	public async handle(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { id } = request.user;

		const initialLoadUseCase = container.resolve(InitialLoadUseCase);

		const initialLoad = await initialLoadUseCase.execute(id);

		return response.json(initialLoad);
	}
}

export { InitialLoadController }
