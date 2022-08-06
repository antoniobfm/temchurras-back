import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
	sub: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
) {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new AppError('Token missing', 401);
	}

	const [, token] = authHeader.split(' ');

	try {
		const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

		request.user = {
			id: user_id,
		};

		next();
	} catch (err) {
		throw new AppError('Invalid token', 401);
	}
}
