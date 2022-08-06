import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { RefreshTokenController } from '@modules/users/useCases/authentication/refreshToken/RefreshTokenController';
import { VerifyVerificationCodeController } from '@modules/users/useCases/authentication/verifyVerificationCode/VerifyVerificationCodeController';
import { SendVerificationCodeController } from '@modules/users/useCases/authentication/sendVerificationCode/SendVerificationCodeController';

const authenticateRoutes = Router();

const refreshTokenController = new RefreshTokenController();
const sendVerificationCode = new SendVerificationCodeController();
const verifyVerificationCode = new VerifyVerificationCodeController();

authenticateRoutes.post(
	'/send-verification-code',
	celebrate({
		[Segments.BODY]: {
			phone_number: Joi.string().required()
		},
	}),
	sendVerificationCode.handle,
);

authenticateRoutes.post(
	'/verify-verification-code',
	celebrate({
		[Segments.BODY]: {
			phone_number: Joi.string().required(),
			verification_code: Joi.string().required()
		},
	}),
	verifyVerificationCode.handle,
);

authenticateRoutes.post('/refresh', refreshTokenController.handle);

export { authenticateRoutes };
