import { createSlice } from '@reduxjs/toolkit';
import { AccountResponseDto, PreferencesResponseDto, ProfileResponseDto, ThemeMode } from 'common';

import {
	authenticateAccount,
	createAccount,
	updatePreferences,
	updateProfile,
} from '@/features/settings/account/accountActions';

export type PreferencesState = PreferencesResponseDto;

export type ProfileState = ProfileResponseDto;

export type AccountState = AccountResponseDto & {
	authenticated: boolean;
	preferences: PreferencesState;
	profile: ProfileState;
	promptAccountSetup: boolean;
};

export const getAccountInitialState = (): AccountState => ({
	authenticated: false,
	dateUpdated: null,
	id: null,
	preferences: {
		fontSize: 16,
		id: null,
		theme: ThemeMode.SYSTEM,
	},
	profile: {
		displayName: '',
		email: '',
		givenName: '',
		id: null,
		surname: '',
	},
	promptAccountSetup: false,
});

const accountSlice = createSlice({
	extraReducers: (builder) => {
		builder.addCase(authenticateAccount.fulfilled, (state, action) => {
			state.authenticated = true;
			state.preferences = action.payload.data?.preferences ?? state.preferences;
			state.profile = action.payload.data?.profile ?? state.profile;
		});
		builder.addCase(createAccount.fulfilled, (state, action) => {
			state.authenticated = true;
			state.promptAccountSetup = true;
			state.preferences = action.payload.data?.preferences ?? state.preferences;
			state.profile = action.payload.data?.profile ?? state.profile;
		});
		builder.addCase(updatePreferences.fulfilled, (state, action) => {
			state.preferences = action.payload.data ?? state.preferences;
		});
		builder.addCase(updateProfile.fulfilled, (state, action) => {
			state.profile = action.payload.data ?? state.profile;
		});
	},
	initialState: getAccountInitialState(),
	name: 'user',
	reducers: {
		setAuthenticated: (state, action) => {
			state.authenticated = action.payload;
		},
		setPromptAccountSetup: (state, action) => {
			state.promptAccountSetup = action.payload;
		},
	},
});

export const { setAuthenticated, setPromptAccountSetup } = accountSlice.actions;

export const accountReducer = accountSlice.reducer;
