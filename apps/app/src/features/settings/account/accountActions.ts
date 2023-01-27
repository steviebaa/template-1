import {
	AccountResponseDto,
	CreateAccountRequestDto,
	EndPoints,
	PreferencesResponseDto,
	ProfileResponseDto,
	UpdatePreferencesRequestDto,
	UpdateProfileRequestDto,
} from 'common';

import {
	createAsyncThunkFetchPatch,
	createAsyncThunkFetchPost,
	createAsyncThunkFetchPut,
} from '@/utils/createAsyncThunkFetch';

export const authenticateAccount = createAsyncThunkFetchPost<void, void, AccountResponseDto>({
	requestConfig: {
		pathName: EndPoints.ACCOUNTS_AUTHENTICATE,
	},
	typePrefix: 'accounts/authenticateAccount',
});

export const createAccount = createAsyncThunkFetchPut<CreateAccountRequestDto, void, AccountResponseDto>({
	requestConfig: {
		pathName: EndPoints.ACCOUNTS,
	},
	typePrefix: 'accounts/createAccount',
});

export const updatePreferences = createAsyncThunkFetchPatch<UpdatePreferencesRequestDto, void, PreferencesResponseDto>({
	requestConfig: {
		pathName: EndPoints.PREFERENCES,
	},
	typePrefix: 'accounts/updatePreferences',
});

export const updateProfile = createAsyncThunkFetchPatch<UpdateProfileRequestDto, void, ProfileResponseDto>({
	requestConfig: {
		pathName: EndPoints.PROFILES,
	},
	typePrefix: 'accounts/updateProfile',
});
