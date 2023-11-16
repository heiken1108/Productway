import React, { useEffect } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';

import AddToFavourite from '../../Components/AddToFavourite/AddToFavourite';
import ErrorContainer from '../../Components/Error/ErrorContainer';
import LoadingContainer from '../../Components/Loading/LoadingContainer';
import RatingComponent from '../../Components/RatingComponent/RatingComponent';
import {
	ADD_RATING,
	GET_PRODUCT_BY_PRODUCT_ID,
	GET_RATING_BY_PRODUCT_ID_AND_USER_ID,
	REMOVE_RATING,
} from '../../queries';

import './Productpage.css';
import { useRecoilValue } from 'recoil';
import { navigateHistory } from '../../store/atoms';

export default function Productpage() {
	const { id } = useParams() as { id: string };
	const navigate = useNavigate();
	const prevPage = useRecoilValue(navigateHistory);
	const userID = localStorage.getItem('userID') || '';
	const [setRatingByProductId] = useMutation(ADD_RATING);
	const [removeRatingByProductId] = useMutation(REMOVE_RATING);
	const {
		data: ratingData,
		loading: ratingLoading,
		error: ratingError,
		refetch,
	} = useQuery(GET_RATING_BY_PRODUCT_ID_AND_USER_ID, {
		variables: { productID: Number(id), userID: userID },
	});
	const {
		data: productData,
		loading: productLoading,
		error: productError,
	} = useQuery(GET_PRODUCT_BY_PRODUCT_ID, {
		variables: { productID: Number(id) },
	});

	// Refetch the rating when the user changes the rating
	useEffect(() => {
		refetch();
	}, [refetch]);

	/**
	 * @param newRating
	 * @description Function for posting and updating the rating of the product the user is currently viewing
	 */
	function updateRating(newRating: number) {
		setRatingByProductId({
			variables: {
				rating: newRating,
				productID: productData.getProductByProductID.productID,
				userID: userID,
			},
		});
	}

	/** /
	 * Function for handling the rating change. Also includes a two second delay when rating is changed to
	 * minimize backend/database calls
	 * @param _event
	 * @param newValue
	 */
	const handleRatingChange = (
		_event: React.SyntheticEvent<Element, Event>,
		newValue: number | null,
	) => {
		if (newValue !== null && newValue !== undefined) {
			updateRating(newValue);
		} else if (newValue === null) {
			removeRatingByProductId({
				variables: {
					productID: productData.getProductByProductID.productID,
					userID: userID,
				},
			});
		}
	};

	// Get the rating from the database, if it exists
	const rating = ratingData?.getRatingByProductIDandUserID?.rating || 0;

	// If loading or error, display loading animation or loading container
	if (productLoading || ratingLoading) return <LoadingContainer />;
	if (productError || ratingError) return <ErrorContainer />;

	return (
		<div>
			<button onClick={() => navigate(prevPage)}>&#x2190; Tilbake</button>
			<div className="productContainer">
				<div className="productContent">
					<div className="productImage">
						<img
							src={productData.getProductByProductID.image}
							alt="Image not found"
						/>
					</div>
					<div className="productInfo">
						<h1>{productData.getProductByProductID.name}</h1>
						<h4>
							{'Merke: ' +
								productData.getProductByProductID.brand}
						</h4>
						<p>{productData.getProductByProductID.description}</p>
						<p>
							{'Pris: kr ' +
								productData.getProductByProductID.currentPrice +
								',-'}
						</p>
						<div className="rateAndShopContainer">
							<RatingComponent
								rating={rating}
								onRatingChange={handleRatingChange}
							/>
							<AddToFavourite
								productID={Number(id)}
								userID={userID}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
