import { container } from 'tsyringe';

import './providers';

import { UsersTokensRepository } from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';
import { IUsersTokensRepository } from '@modules/users/repositories/IUserTokensRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IVerificationCodesRepository } from '@modules/users/repositories/IVerificationCodesRepository';
import { VerificationCodesRepository } from '@modules/users/infra/typeorm/repositories/VerificationCodesRepository';
import IChurrasRepository from '@modules/churras/repositories/IChurrasRepository';
import ChurrasRepository from '@modules/churras/infra/typeorm/repositories/ChurrasRepository';
import { IChurrasPresenceRepository } from '@modules/churras/repositories/IChurrasPresenceRepository';
import ChurrasPresenceRepository from '@modules/churras/infra/typeorm/repositories/ChurrasPresenceRepository';

container.registerSingleton<IChurrasRepository>(
	'ChurrasRepository',
	ChurrasRepository,
);

container.registerSingleton<IChurrasPresenceRepository>(
	'ChurrasPresenceRepository',
	ChurrasPresenceRepository,
);

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
	'UsersTokensRepository',
	UsersTokensRepository,
);

container.registerSingleton<IVerificationCodesRepository>(
	'VerificationCodesRepository',
	VerificationCodesRepository,
);
