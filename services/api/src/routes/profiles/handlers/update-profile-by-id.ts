import { ProfileResponseDto, UpdateProfileRequestDto } from 'common';

import { Profile } from '@/entity/Profile';
import { PatchRequestHandler } from '@/types/requestTypes';

export const updateProfileById: PatchRequestHandler<UpdateProfileRequestDto, ProfileResponseDto> = async (
	request,
	reply
) => {
	const { id } = request.params as { id: string };
	const { displayName, email, givenName, surname } = request.body;

	const profile = await Profile.findOneBy({ id }).catch((error) => {
		console.error(error);

		return reply.status(500).send({ message: 'Internal server error' });
	});

	if (!profile) {
		return reply.status(404).send({ message: 'Profile not found' });
	}

	profile.dateUpdated = new Date();
	profile.displayName = displayName ?? profile.displayName;
	profile.email = email ?? profile.email;
	profile.givenName = givenName ?? profile.givenName;
	profile.surname = surname ?? profile.surname;

	await profile.save().catch((error) => {
		console.error(error);

		return reply.status(500).send({ message: 'Internal server error' });
	});

	return reply.status(200).send({ data: profile });
};
