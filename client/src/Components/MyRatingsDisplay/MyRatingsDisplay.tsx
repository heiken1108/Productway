import { useEffect } from 'react';

import { useQuery } from '@apollo/client';

import MyRatingsItem from './MyRatingsItem';
import { IRating } from '../../data/types';
import { GET_RATINGS_BY_USER_ID } from '../../queries';
import ErrorMessage from '../Error/ErrorMessage';
import LoadingAnimation from '../Loading/LoadingAnimation';
import './MyRatingsDisplay.css';

export default function MyRatingsDisplay({ userID }: { userID: string }) {
	const { data, loading, error, refetch } = useQuery(GET_RATINGS_BY_USER_ID, {
		variables: { userID: userID },
	});

	// Refetch the query to update the cashed data
	useEffect(() => {
		refetch();
	}, [refetch]);

	// Get the ratings from the query. Empyt array if no ratings
	const ratings = data?.getRatingsByUserID || [];

	const handleRatingRemoved = () => {
		refetch();
	};
	// If loading or error, display loading animation or loading container
	if (loading) return <LoadingAnimation />;
	if (error) return <ErrorMessage />;

	return (
		<div className="RatingContainer">
			{ratings.length === 0 ? (
				<p>Ingen vurderinger å vise</p>
			) : (
				ratings.map((ratingModel: IRating) => (
					<MyRatingsItem
						key={ratingModel._id}
						productID={ratingModel.productID}
						rating={ratingModel.rating}
						userID={userID}
						handleRatingRemoved={handleRatingRemoved}
					/>
				))
			)}
		</div>
	);
}
