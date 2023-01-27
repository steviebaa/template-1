import { Environments } from 'common';
import { config } from 'dotenv';
import { cleanEnv, str } from 'envalid';

config();

export const environment = cleanEnv(process.env, {
	ENVIRONMENT: str({
		choices: Object.values(Environments),
		default: Environments.PRODUCTION,
	}),
	MYSQL_DB: str(),
	MYSQL_HOST: str(),
	MYSQL_PASSWORD: str(),
	MYSQL_USER: str(),
	PORT: str(),
});

// TODO: Add the below variables to your .env file for local development
// ENVIRONMENT=development
// GOOGLE_APPLICATION_CREDENTIALS="src/configs/firebase-service-account.json"
// MYSQL_DB=template-1
// MYSQL_HOST=mysql
// MYSQL_PASSWORD=password
// MYSQL_USER=root
// PORT=1001
