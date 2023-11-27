import React from 'react';

import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import {
	ADD_RATING,
	GET_PRODUCT_BY_PRODUCT_ID,
	REMOVE_RATING,
} from '../../graphql/queries';
import { navigateHistory } from '../../store/atoms';
import ErrorMessage from '../Error/ErrorMessage';
import LoadingAnimation from '../Loading/LoadingAnimation';
import RatingComponent from '../RatingComponent/RatingComponent';

import './MyRatingsItem.css';

/**
 * This component contains the rating card for a product
 * @param {number} productID - ID of product
 * @param {number} rating - Rating of product
 * @param {string} userID - ID of user
 */
export default function MyRatingsItem({
	productID,
	rating,
	userID,
	handleRatingRemoved,
}: {
	productID: number;
	rating: number;
	userID: string;
	handleRatingRemoved: () => void;
}) {
	const setPrevPage = useSetRecoilState(navigateHistory);
	const location = useLocation();
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
	const handleRatingChange = async (
		_event: React.SyntheticEvent<Element, Event>,
		newValue: number | null,
	) => {
		if (newValue !== undefined && newValue !== null && newValue !== 0) {
			await setRatingByProductId({
				variables: {
					rating: newValue,
					productID: data.getProductByProductID.productID,
					userID: userID,
				},
			});
		} else {
			await removeRatingByProductId({
				variables: {
					productID: data.getProductByProductID.productID,
					userID: userID,
				},
			});
			handleRatingRemoved();
		}
	};
	const navigate = useNavigate();

	function handleNavigate() {
		setPrevPage(location.pathname);
		navigate('/project2/product/' + productID);
	}

	// If loading or error, display loading animation or loading container
	if (loading) return <LoadingAnimation />;
	if (error) return <ErrorMessage />;

	return (
		<div className="RatingItemContainer">
			<div className="theSmileys">
				<RatingComponent
					rating={rating}
					onRatingChange={handleRatingChange}
				/>
			</div>
			<div
				className="RatingItem"
				aria-label={'Navigate to ' + data.getProductByProductID.name}
				onClick={() => handleNavigate()}
			>
				<div className="tittel">
					<strong>
						{data.getProductByProductID.name || 'No name'}
					</strong>
				</div>
			</div>
		</div>
	);
}
