export type CreateProfileRequestDto = {
	displayName: string;
	email: string;
	givenName: string;
	surname: string;
};

export type ProfileResponseDto = {
	id: string;
	displayName: string;
	email: string;
	givenName: string;
	surname: string;
};

export type UpdateProfileRequestDto = {
	id: string;
	displayName?: string;
	email?: string;
	givenName?: string;
	surname?: string;
};
