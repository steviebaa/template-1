import { EndPoints } from 'common';
import { FastifyInstance } from 'fastify';

import { updatePreferencesById } from '@/routes/preferences/handlers/update-preferences-by-id';

export const registerPreferencesRoutes = (app: FastifyInstance) => {
	app.patch(`${EndPoints.PREFERENCES}/:id`, updatePreferencesById);
};
