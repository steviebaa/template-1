import { Environments } from 'common';

export const corsWhitelistMap: Record<Environments, string[] | null> = {
	[Environments.DEVELOPMENT]: null,
	[Environments.PRODUCTION]: ['https://template-1-app.vercel.app/'],
};
