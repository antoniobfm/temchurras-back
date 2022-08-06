/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserUseCase from '../../user/createUser/CreateUserUseCase';
import { AuthenticateUseCase } from '../authenticate/AuthenticateUseCase';

import { VerifyVerificationCodeUseCase } from './VerifyVerificationCodeUseCase';

class VerifyVerificationCodeController {
	public async handle(request: Request, response: Response): Promise<Response> {
		const { phone_number, verification_code } = request.body;

		const verifyVerificationCodeUseCase = container.resolve(VerifyVerificationCodeUseCase);
		const authenticateUseCase = container.resolve(AuthenticateUseCase);

		const status = await verifyVerificationCodeUseCase.execute({ phone_number, verification_code });

		if (status === 'authenticate') {
			const authenticate = await authenticateUseCase.execute({
				phone_number
			});

			return response.json(authenticate);
		} else {
			const createUser = container.resolve(CreateUserUseCase);

			const user = await createUser.execute({
				phone_number,
			});

			const authenticate = await authenticateUseCase.execute({
				phone_number
			});

			return response.json(authenticate);
		}
	}
}
export { VerifyVerificationCodeController }
