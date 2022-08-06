import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { InitialLoadController } from '@modules/users/useCases/user/initialLoad/InitialLoadController';
import { UpdateNameController } from '@modules/users/useCases/user/updateName/UpdateNameController';

const usersRouter = Router();

const initialLoad = new InitialLoadController();
const updateName = new UpdateNameController();

usersRouter.post(
	'/initial-load',
	ensureAuthenticated,
	initialLoad.handle,
);

usersRouter.post(
	'/update-name',
	ensureAuthenticated,
	updateName.handle,
);

export { usersRouter };
