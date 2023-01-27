import { FC, useState } from 'react';
import { Card, Row, Slider, Typography, useSnackbar } from 'ui';

import { useDispatch, useSelector } from '@/core/store/hooks';
import { updatePreferences } from '@/features/settings/account/accountActions';
import { makeUpdateEntityOptions } from '@/features/settings/account/accountHelpers';

export const FontSizeSlider: FC = () => {
	const dispatch = useDispatch();
	const snackbar = useSnackbar();
	const { preferences } = useSelector((state) => state.account);
	const [sliderValue, setSliderValue] = useState(preferences.fontSize ?? 16);

	const handleFailedToUpdate = () => snackbar.error('Failed to update preferences');

	const handleFontSizeCommitted = async (value: number) => {
		if (value !== preferences.fontSize) {
			try {
				const payload = { fontSize: value, id: preferences.id };
				const response = await dispatch(updatePreferences(makeUpdateEntityOptions(payload)));
				if (updatePreferences.fulfilled.match(response)) {
					snackbar.success('Theme successfully updated');
				} else {
					handleFailedToUpdate();
				}
			} catch {
				handleFailedToUpdate();
			}
		}
	};

	return (
		<Card themeBgColor="bg2">
			<Typography variant="overline">Font Size</Typography>
			<Typography variant="subtitle">All text will scale relative to {sliderValue}px.</Typography>
			<Row justify="center">
				<Slider
					aria-label="Base font size"
					marks={[
						{ label: '10px', value: 10 },
						{ label: '12px', value: 12 },
						{ label: '14px', value: 14 },
						{ label: '16px', value: 16 },
						{ label: '18px', value: 18 },
						{ label: '20px', value: 20 },
						{ label: '22px', value: 22 },
						{ label: '24px', value: 24 },
					]}
					onChange={(v) => setSliderValue(v)}
					onChangeCommitted={handleFontSizeCommitted}
					value={sliderValue}
					width="80%"
				/>
			</Row>
		</Card>
	);
};
