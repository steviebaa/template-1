import { AccountResponseDto } from 'common';

import { Account } from '@/entity/Account';
import { PostRequestHandler } from '@/types/requestTypes';
import { decodeTokenFromHeader } from '@/utils/authToken';

type AuthenticateRequest = {
	token: string;
};

export const authenticate: PostRequestHandler<AuthenticateRequest, AccountResponseDto> = async (request, reply) => {
	const { user_id } = await decodeTokenFromHeader(request);

	const account = await Account.findOne({
		relations: ['preferences', 'profile'],
		where: { id: user_id },
	}).catch((error) => {
		console.error(error);

		return reply.status(500).send({ message: 'Internal server error' });
	});

	if (!account) {
		return reply.status(200).send({ message: 'Account not found' });
	}

	return reply.status(200).send({ data: account });
};
