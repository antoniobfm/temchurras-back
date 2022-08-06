import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ConfirmPresenceController } from '@modules/churras/useCases/confirmPresence/ConfirmPresenceController';
import { ConfirmContributionController } from '@modules/churras/useCases/confirmContribution/ConfirmContributionController';
import { RemoveParticipantController } from '@modules/churras/useCases/removeParticipant/RemoveParticipantController';

const churrasPresenceRoutes = Router();

const confirmPresence = new ConfirmPresenceController();
const confirmContribution = new ConfirmContributionController();
const removeParticipant = new RemoveParticipantController();

churrasPresenceRoutes.post(
	'/confirm-presence',
	ensureAuthenticated,
	celebrate({
		[Segments.BODY]: {
			churras_id: Joi.string().required(),
		},
	}),
	confirmPresence.handle,
);

churrasPresenceRoutes.post(
	'/confirm-contribution',
	ensureAuthenticated,
	celebrate({
		[Segments.BODY]: {
			churras_id: Joi.string().required(),
			contributor_id: Joi.string().required(),
			amount_contributed: Joi.number().required(),
		},
	}),
	confirmContribution.handle,
);

churrasPresenceRoutes.post(
	'/remove-participant',
	ensureAuthenticated,
	celebrate({
		[Segments.BODY]: {
			churras_id: Joi.string().required(),
			participant_id: Joi.string().required(),
		},
	}),
	removeParticipant.handle,
);

export default churrasPresenceRoutes;
