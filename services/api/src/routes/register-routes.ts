import { FastifyInstance } from 'fastify';

import { registerAccountRoutes } from '@/routes/accounts/register-accounts-routes';
import { registerHealthRoutes } from '@/routes/health/register-health-routes';
import { registerPreferencesRoutes } from '@/routes/preferences/register-preferences-routes';
import { registerProfileRoutes } from '@/routes/profiles/register-profiles-routes';

export const registerRoutes = (app: FastifyInstance) => {
	registerAccountRoutes(app);
	registerHealthRoutes(app);
	registerProfileRoutes(app);
	registerPreferencesRoutes(app);
};
