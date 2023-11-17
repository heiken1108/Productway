import { useState } from 'react';

import { Alert, Snackbar } from '@mui/material';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

import customIcons from '../../data/ratingIcons.tsx';

/*
 * Styling for the rating icons
 */
const StyledRating = styled(Rating)(({ theme }) => ({
	'& .MuiRating-iconEmpty .MuiSvgIcon-root': {
		color: theme.palette.action.disabled,
	},
}));

/*
 * function for displaying the rating icons
 */
function IconContainer(props: IconContainerProps) {
	const { value, ...other } = props;
	return <span {...other}>{customIcons[value].icon}</span>;
}
interface RatingComponentProps {
	rating: number;
	onRatingChange: (
		event: React.SyntheticEvent<Element, Event>,
		newValue: number | null,
	) => void;
}

export default function RatingComponent(props: RatingComponentProps) {
	const [rating, setRating] = useState(props.rating);
	const [rated, setRated] = useState(false);
	const [removeRating, setRemovedRating] = useState(false);

	const ratingChange = (
		_event: React.SyntheticEvent<Element, Event>,
		newValue: number | null,
	) => {
		setRating(newValue ? Number(newValue) : 0);
		if (newValue === 0 || newValue === null) {
			setRated(false);
			setRemovedRating(true);
			props.onRatingChange(_event, 0);
			return;
		} else {
			setRemovedRating(false);
			setRated(true);
			props.onRatingChange(_event, newValue);
		}
	};
	/*
	 * This function closes the snackbar after autoHideDuration.
	 */
	const handleClose = (
		_event?: React.SyntheticEvent | Event,
		reason?: string,
	) => {
		if (reason === 'clickaway') {
			return;
		}
		setRated(false);
		setRemovedRating(false);
	};

	return (
		<>
			<StyledRating
				name="highlight-selected-only"
				value={rating}
				IconContainerComponent={IconContainer}
				getLabelText={(value: number) => customIcons[value].label}
				highlightSelectedOnly
				onChange={(
					event: React.SyntheticEvent<Element, Event>,
					newValue: number | null,
				) => ratingChange(event, newValue)}
			/>
			<Snackbar
				open={rated}
				autoHideDuration={3000}
				onClose={handleClose}
			>
				<Alert
					onClose={handleClose}
					severity="success"
					sx={{ width: '100%' }}
				>
					Produkt vurdert til {rating}
				</Alert>
			</Snackbar>
			<Snackbar
				open={removeRating}
				autoHideDuration={3000}
				onClose={handleClose}
			>
				<Alert
					onClose={handleClose}
					severity="error"
					sx={{ width: '100%' }}
				>
					Fjernet vurdering!
				</Alert>
			</Snackbar>
		</>
	);
}
