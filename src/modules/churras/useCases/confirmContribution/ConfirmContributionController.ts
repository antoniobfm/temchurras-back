import { Request, Response } from "express";
import { container } from "tsyringe";

import { ConfirmContributionUseCase } from "./ConfirmContributionUseCase";

class ConfirmContributionController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.user;
		const { churras_id, amount_contributed, contributor_id } = request.body;

		const confirmContributionUseCase = container.resolve(
			ConfirmContributionUseCase
		);

		const churras = await confirmContributionUseCase.execute({
			user_id: id,
			churras_id: churras_id,
			contributor_id,
			amount_contributed
		});

		return response.json(churras);
	}
}
export { ConfirmContributionController };
