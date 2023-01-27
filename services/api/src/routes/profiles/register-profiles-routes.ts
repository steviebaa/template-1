import { EndPoints } from 'common';
import { FastifyInstance } from 'fastify';

import { updateProfileById } from '@/routes/profiles/handlers/update-profile-by-id';

export const registerProfileRoutes = (app: FastifyInstance) => {
	app.patch(`${EndPoints.PROFILES}/:id`, updateProfileById);
};
