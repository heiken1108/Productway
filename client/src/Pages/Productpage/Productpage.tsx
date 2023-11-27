import React, { useEffect } from 'react';

import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import AddToFavourite from '../../Components/AddToFavourite/AddToFavourite';
import ErrorContainer from '../../Components/Error/ErrorContainer';
import LoadingContainer from '../../Components/Loading/LoadingContainer';
import RatingComponent from '../../Components/RatingComponent/RatingComponent';
import customIcons from '../../data/ratingIcons';
import {
	ADD_RATING,
	GET_AVERAGE_RATING_BY_PRODUCT_ID,
	GET_PRODUCT_BY_PRODUCT_ID,
	GET_RATING_BY_PRODUCT_ID_AND_USER_ID,
	REMOVE_RATING,
} from '../../graphql/queries';
import { navigateHistory } from '../../store/atoms';

import './Productpage.css';

/**
 * This component is the page for a specific product.
 */
export default function Productpage() {
	const { id } = useParams() as { id: string };
	const navigate = useNavigate();
	const userID = localStorage.getItem('userID') || '';
	const prevPage = useRecoilValue(navigateHistory);
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
	const {
		data: averageRatingData,
		loading: averageRatingLoading,
		error: averageRatingError,
	} = useQuery(GET_AVERAGE_RATING_BY_PRODUCT_ID, {
		variables: {
			productID: Number(id),
		},
	});

	const client = useApolloClient();
	useEffect(() => {
		const refetchData = async () => {
			await client.query({
				query: GET_AVERAGE_RATING_BY_PRODUCT_ID,
				variables: { productID: Number(id) },
				fetchPolicy: 'network-only', // This ensures the query always goes to the network instead of using the cache
			});
		};

		refetchData();
	}, [id, client]);

	// Refetch the rating when the user changes the rating
	useEffect(() => {
		refetch();
	}, [refetch]);

	/** /
	 * Function for handling the rating change.
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
					productID: productData.getProductByProductID.productID,
					userID: userID,
				},
			});
		} else {
			removeRatingByProductId({
				variables: {
					productID: productData.getProductByProductID.productID,
					userID: userID,
				},
			});
		}
	};

	function handleNavigateBack() {
		navigate(prevPage);
	}
	// Get the rating from the database, if it exists
	const rating = ratingData?.getRatingByProductIDandUserID?.rating || 0;
	// If loading or error, display loading animation or loading container
	if (productLoading || ratingLoading || averageRatingLoading)
		return <LoadingContainer />;
	if (productError || ratingError || averageRatingError)
		return <ErrorContainer />;
	return (
		<div>
			<button
				aria-label="Navigate back"
				onClick={() => handleNavigateBack()}
			>
				&#x2190; Tilbake
			</button>
			<div className="productContainer">
				<div className="productContent">
					<div className="productImage">
						<img
							src={productData.getProductByProductID.image}
							alt={productData.getProductByProductID.name}
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
							Pris:{' '}
							{
								<strong>
									kr{' '}
									{
										productData.getProductByProductID
											.currentPrice
									}
									,-
								</strong>
							}{' '}
							hos {productData.getProductByProductID.store}
						</p>
						<div className="averageRatingContainer">
							{averageRatingData.getAverageProductRating !== 0 &&
							averageRatingData.getAverageProductRating !==
								undefined ? (
								<>
									<p>
										{'Gjennomsnittlig vurdering: '}
										<strong>
											{
												averageRatingData.getAverageProductRating
											}
										</strong>
									</p>
									<div>
										{
											customIcons[
												Math.round(
													averageRatingData.getAverageProductRating,
												)
											].icon
										}
									</div>
								</>
							) : (
								<p>Ingen har vurdert produktet</p>
							)}
						</div>
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
