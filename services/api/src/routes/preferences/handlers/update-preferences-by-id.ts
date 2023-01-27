import { PreferencesResponseDto, UpdatePreferencesRequestDto } from 'common';

import { Preferences } from '@/entity/Preferences';
import { PatchRequestHandler } from '@/types/requestTypes';

export const updatePreferencesById: PatchRequestHandler<UpdatePreferencesRequestDto, PreferencesResponseDto> = async (
	request,
	reply
) => {
	const { id } = request.params as { id: string };
	const { fontSize, theme } = request.body;

	const preferences = await Preferences.findOneBy({ id }).catch((error) => {
		console.error(error);

		return reply.status(500).send({ message: 'Internal server error' });
	});

	if (!preferences) {
		return reply.status(404).send({ message: 'Preferences not found' });
	}

	preferences.dateUpdated = new Date();
	preferences.fontSize = fontSize ?? preferences.fontSize;
	preferences.theme = theme ?? preferences.theme;

	await preferences.save().catch((error) => {
		console.error(error);

		return reply.status(500).send({ message: 'Internal server error' });
	});

	return reply.status(200).send({ data: preferences });
};
