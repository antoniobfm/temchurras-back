import { Router } from 'express';

import { usersRouter } from '@modules/users/infra/http/routes/users.routes';
import { authenticateRoutes } from '@modules/users/infra/http/routes/authenticate.routes';
import churrasRoutes from '@modules/churras/infra/http/churras.routes';
import churrasPresenceRoutes from '@modules/churras/infra/http/churrasPresence.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/authentication', authenticateRoutes);
routes.use('/churras', churrasRoutes)
routes.use('/churras-presence', churrasPresenceRoutes)

export default routes;
