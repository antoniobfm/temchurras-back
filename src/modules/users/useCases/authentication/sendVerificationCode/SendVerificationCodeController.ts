/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendVerificationCodeUseCase } from './SendVerificationCodeUseCase';

class SendVerificationCodeController {
	public async handle(request: Request, response: Response): Promise<Response> {
		const { phone_number } = request.body;
		console.log('aaa')

		const sendVerificationCodeUseCase = container.resolve(SendVerificationCodeUseCase);

		const status = await sendVerificationCodeUseCase.execute({ phone_number });

		return response.json(status);
	}
}
export { SendVerificationCodeController }
