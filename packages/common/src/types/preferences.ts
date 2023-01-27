import { ThemeMode } from './theme';

export type PreferencesResponseDto = {
	id: string;
	fontSize: number;
	theme: ThemeMode;
};

export type UpdatePreferencesRequestDto = {
	id: string;
	fontSize?: number;
	theme?: ThemeMode;
};
