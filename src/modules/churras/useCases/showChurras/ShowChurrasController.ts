import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowChurrasUseCase } from "./ShowChurrasUseCase";

class ShowChurrasController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { churras_id } = request.body;

		const showChurrasUseCase = container.resolve(
			ShowChurrasUseCase
		);

		const churras = await showChurrasUseCase.execute({
			churras_id
		});

		return response.json(churras);
	}
}
export { ShowChurrasController };
