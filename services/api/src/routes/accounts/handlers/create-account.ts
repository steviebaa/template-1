import { AccountResponseDto, CreateAccountRequestDto } from 'common';

import { Account } from '@/entity/Account';
import { Preferences } from '@/entity/Preferences';
import { Profile } from '@/entity/Profile';
import { PutRequestHandler } from '@/types/requestTypes';

export const createAccount: PutRequestHandler<CreateAccountRequestDto, AccountResponseDto> = async (request, reply) => {
	const { id, profile } = request.body;

	const preferences = new Preferences();

	const newProfile = new Profile();
	newProfile.displayName = profile.displayName;
	newProfile.givenName = profile.givenName;
	newProfile.surname = profile.surname;
	newProfile.email = profile.email;

	const account = new Account();
	account.id = id;
	account.preferences = preferences;
	account.profile = newProfile;
	account.dateUpdated = new Date();

	if (account)
		await account.save().catch((error) => {
			console.error(error);

			return reply.status(500).send();
		});

	return reply.status(201).send({ data: account });
};
