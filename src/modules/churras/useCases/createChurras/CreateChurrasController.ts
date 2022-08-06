import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateChurrasUseCase } from "./CreateChurrasUseCase";

class CreateChurrasController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.user;
		const {
				name,
				description,
				date,

				suggested_contribution_with_drinks,
				suggested_contribution_without_drinks,

				pix_key,
				pix_type,
			} = request.body;

		const createChurrasUseCase = container.resolve(
			CreateChurrasUseCase
		);

		const churras = await createChurrasUseCase.execute({
			creator_id: id,

			name,
			description,
			date,

			suggested_contribution_with_drinks,
			suggested_contribution_without_drinks,

			pix_key,
			pix_type
		});

		return response.json(churras);
	}
}
export { CreateChurrasController };
