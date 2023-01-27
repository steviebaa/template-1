import { AccountResponseDto, AccountType, UpdateAccountRequestDto } from 'common';

import { Account } from '@/entity/Account';
import { PatchRequestHandler } from '@/types/requestTypes';
import { decodeTokenFromHeader } from '@/utils/authToken';

export const updateAccountById: PatchRequestHandler<UpdateAccountRequestDto, AccountResponseDto> = async (
	request,
	reply
) => {
	const { id } = request.params as { id: string };
	const { forceSignOut, hasAcceptedTerms, role, status } = request.body;

	const account = await Account.findOneBy({ id }).catch((error) => {
		console.error(error);

		return reply.status(500).send({ message: 'Internal server error' });
	});

	if (!account) {
		return reply.status(404).send({ message: 'Target account not found' });
	}

	const { uid: requestingAccountId } = await decodeTokenFromHeader(request);
	const requestingAccount = await Account.findOneBy({ id: requestingAccountId }).catch((error) => {
		console.error(error);

		return reply.status(500).send({ message: 'Internal server error' });
	});

	if (!requestingAccount) {
		return reply.status(404).send({ message: 'Requesting account not found' });
	}

	const isAdmin = [AccountType.ADMIN, AccountType.OWNER].includes(requestingAccount.role);
	const requestingToUpdateRole = role && role !== account.role;
	const requestingToUpdateStatus = status && status !== account.status;
	if (requestingToUpdateRole || requestingToUpdateStatus) {
		if (isAdmin) {
			account.role = role ?? account.role;
			account.status = status ?? account.status;
		} else {
			return reply.status(403).send({ message: 'Not authorised' });
		}
	}

	account.dateUpdated = new Date();
	account.forceSignOut = forceSignOut ?? account.forceSignOut;
	account.hasAcceptedTerms = hasAcceptedTerms ?? account.hasAcceptedTerms;

	await account.save().catch((error) => {
		console.error(error);

		return reply.status(500).send({ message: 'Internal server error' });
	});

	return reply.status(200).send({ data: account });
};
