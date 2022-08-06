import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { CreateChurrasController } from '@modules/churras/useCases/createChurras/CreateChurrasController';
import { ShowChurrasController } from '@modules/churras/useCases/showChurras/ShowChurrasController';

const churrasRoutes = Router();

const createChurras = new CreateChurrasController();
const showChurras = new ShowChurrasController();

churrasRoutes.post(
	'/create',
	ensureAuthenticated,
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			description: Joi.string().required(),
			date: Joi.required(),

			suggested_contribution_with_drinks: Joi.required(),
			suggested_contribution_without_drinks: Joi.required(),

			pix_key: Joi.string().required(),
			pix_type: Joi.string().required(),
		},
	}),
	createChurras.handle,
);

churrasRoutes.post(
	'/show',
	ensureAuthenticated,
	celebrate({
		[Segments.BODY]: {
			churras_id: Joi.string().required(),
		},
	}),
	showChurras.handle,
);

export default churrasRoutes;
