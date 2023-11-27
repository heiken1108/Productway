import { useQuery } from '@apollo/client';

import { IProduct } from '../../data/types';
import { GET_FAVORITES_BY_USER_ID } from '../../graphql/queries';
import ErrorMessage from '../Error/ErrorMessage';
import LoadingAnimation from '../Loading/LoadingAnimation';
import ProductCard from '../ProductCard/ProductCard';

import './FavouriteContainer.css';
/**
 * * This component is a container for the favourite cards.
 * @param {string} userID - The user ID of the user
 */

export default function FavouriteContainer({ userID }: { userID: string }) {
	const { data, loading, error } = useQuery(GET_FAVORITES_BY_USER_ID, {
		variables: { userID: userID },
	});

	const favorites = data?.getFavoritesByUserID || [];

	if (loading) return <LoadingAnimation />;
	if (error) return <ErrorMessage />;
	return (
		<div className="FavouriteContainer">
			{favorites.length === 0 ? (
				<p>Ingen favoritter</p>
			) : (
				favorites.map((item: IProduct) => (
					<ProductCard key={item.productID} item={item} />
				))
			)}
		</div>
	);
}
