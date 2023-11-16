import React from 'react';

import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import {
	ADD_RATING,
	GET_PRODUCT_BY_PRODUCT_ID,
	REMOVE_RATING,
} from '../../queries';
import ErrorMessage from '../Error/ErrorMessage';
import LoadingAnimation from '../Loading/LoadingAnimation';
import RatingComponent from '../RatingComponent/RatingComponent';

export default function MyRatingsItem({
	productID,
	rating,
	userID,
}: {
	productID: number;
	rating: number;
	userID: string;
}) {
	const { data, loading, error } = useQuery(GET_PRODUCT_BY_PRODUCT_ID, {
		variables: { productID: productID },
	});

	// Mutation for adding a rating
	const [setRatingByProductId] = useMutation(ADD_RATING);
	const [removeRatingByProductId] = useMutation(REMOVE_RATING);

	/**
	 * Function for posting and updating the rating of the product the user is currently viewing
	 * @param _event
	 * @param newValue
	 */
	const handleRatingChange = (
		_event: React.SyntheticEvent<Element, Event>,
		newValue: number | null,
	) => {
		if (newValue !== undefined && newValue !== null && newValue !== 0) {
			setRatingByProductId({
				variables: {
					rating: newValue,
					productID: data.getProductByProductID.productID,
					userID: userID,
				},
			});
		} else {
			removeRatingByProductId({
				variables: {
					productID: data.getProductByProductID.productID,
					userID: userID,
				},
			});
		}
	};

	// If loading or error, display loading animation or loading container
	if (loading) return <LoadingAnimation />;
	if (error) return <ErrorMessage />;

	return (
		<ListItem button>
			<ListItemText
				primary={data.getProductByProductID.name || 'No name'}
				primaryTypographyProps={{ style: { fontWeight: 'bold' } }}
				secondary={
					<React.Fragment>
						<RatingComponent
							rating={rating}
							onRatingChange={handleRatingChange}
						/>
					</React.Fragment>
				}
			/>
			<Divider />
		</ListItem>
	);
}
