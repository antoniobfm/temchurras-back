import { Request, Response } from "express";
import { container } from "tsyringe";

import { ConfirmPresenceUseCase } from "./ConfirmPresenceUseCase";

class ConfirmPresenceController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.user;
		const { churras_id } = request.body;

		const confirmPresenceUseCase = container.resolve(
			ConfirmPresenceUseCase
		);

		const churras = await confirmPresenceUseCase.execute({
			user_id: id,
			churras_id: churras_id,
		});

		return response.json(churras);
	}
}
export { ConfirmPresenceController };
