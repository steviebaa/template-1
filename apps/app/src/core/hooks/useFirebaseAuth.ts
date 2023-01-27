import { User } from 'firebase/auth';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { firebaseAuth } from '@/core/configs/firebase';
import { PathNames } from '@/core/configs/paths';
import { useDispatch, useSelector } from '@/core/store/hooks';
import { setIsAuthenticating } from '@/features/authentication/athenticationSlice';
import { authenticateAccount, createAccount } from '@/features/settings/account/accountActions';
import { makeCreateAccountOptions } from '@/features/settings/account/accountHelpers';

const exemptPaths = [`/${PathNames.ERROR}`, `/${PathNames.SIGN_IN}`, `/${PathNames.SIGN_UP}`];

export const useFirebaseAuth = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const { authenticated } = useSelector((state) => state.account);

	const handleRedirectToSignIn = () => {
		firebaseAuth.signOut();

		if (!exemptPaths.includes(location.pathname)) {
			navigate(`/${PathNames.SIGN_IN}`);
		}
	};

	const handleAuthStateChanged = async (user: User) => {
		dispatch(setIsAuthenticating(true));
		const authenticateResponse = await dispatch(authenticateAccount());

		if (!user) {
			handleRedirectToSignIn();
			dispatch(setIsAuthenticating(false));

			return;
		}

		if (authenticated) {
			dispatch(setIsAuthenticating(false));

			return;
		}

		const fulfilledAuthResponse = authenticateAccount.fulfilled.match(authenticateResponse);
		const serverDown = !fulfilledAuthResponse && authenticateResponse.error.message === 'Failed to fetch';

		if (fulfilledAuthResponse) {
			if (authenticateResponse.payload.message === 'Account not found') {
				dispatch(createAccount(makeCreateAccountOptions(user)));
			}
		}

		if (serverDown) {
			if (user) {
				navigate(`/${PathNames.ERROR}`);
			}
			dispatch(setIsAuthenticating(false));
		} else if (fulfilledAuthResponse) {
			if ([400, 401].includes(authenticateResponse.payload.status)) {
				handleRedirectToSignIn();
			} else {
				dispatch(setIsAuthenticating(false));
			}
		}
	};

	useEffect(() => {
		const unsubscribe = firebaseAuth.onAuthStateChanged(handleAuthStateChanged);

		return () => {
			unsubscribe();
		};
	}, []);
};
