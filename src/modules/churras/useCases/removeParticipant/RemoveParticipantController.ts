import { Request, Response } from "express";
import { container } from "tsyringe";

import { RemoveParticipantUseCase } from "./RemoveParticipantUseCase";

class RemoveParticipantController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.user;
		const { churras_id, participant_id } = request.body;

		const removeParticipantUseCase = container.resolve(
			RemoveParticipantUseCase
		);

		const churras = await removeParticipantUseCase.execute({
			user_id: id,
			participant_id,
			churras_id: churras_id,
		});

		return response.json(churras);
	}
}
export { RemoveParticipantController };
