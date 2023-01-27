import { DataSource, DataSourceOptions } from 'typeorm';

import { environment } from '@/configs/environment';
import { Account } from '@/entity/Account';
import { Preferences } from '@/entity/Preferences';
import { Profile } from '@/entity/Profile';

export const dataSourceOptions: DataSourceOptions = {
	database: environment.MYSQL_DB,
	entities: [Account, Preferences, Profile],
	host: environment.MYSQL_HOST,
	logging: false,
	migrations: [],
	password: environment.MYSQL_PASSWORD,
	port: 3306,
	subscribers: [],
	synchronize: true,
	type: 'mysql',
	username: environment.MYSQL_USER,
};

export const AppDataSource = new DataSource(dataSourceOptions);

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const connectToDb = async () => {
	const maxAttempts = 10;
	let connected = false;
	let attempts = 0;
	while (!connected) {
		if (attempts > maxAttempts) {
			console.error('AppDataSource.initialize() failed, no more attempts.');

			return;
		}

		attempts++;
		await AppDataSource.initialize()
			.then(() => {
				console.log('Connected to database.');
				connected = true;
			})
			.catch((e) => {
				console.error(e);
				console.error('Failed to connect to database, retrying...');
			});
		await wait(3000);
	}
};

connectToDb();
