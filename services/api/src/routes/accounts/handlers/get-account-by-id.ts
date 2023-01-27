import { AccountResponseDto } from 'common';

import { Account } from '@/entity/Account';
import { GetRequestHandler } from '@/types/requestTypes';

export const getAccountById: GetRequestHandler<AccountResponseDto> = async (request, reply) => {
	const { id } = request.params;

	const account = await Account.findOne({
		relations: ['preferences', 'profile'],
		where: { id },
	}).catch((error) => {
		console.log(error);
	});

	if (account) {
		return reply.status(200).send({ data: account });
	}

	return reply.status(404).send({ message: 'Account not found' });
};
