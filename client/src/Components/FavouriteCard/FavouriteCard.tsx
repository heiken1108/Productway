import { useQuery } from '@apollo/client';

import { GET_PRODUCT_BY_PRODUCT_ID } from '../../queries';
import ErrorMessage from '../Error/ErrorMessage';
import LoadingAnimation from '../Loading/LoadingAnimation';
import ProductCard from '../ProductCard/ProductCard';

import './FavouriteCard.css';

interface FavouriteCardProps {
	id: number;
}

/*
 * This component is a card for the favourite items.
 */
export default function FavouriteCard(props: FavouriteCardProps) {
	const { data, loading, error } = useQuery(GET_PRODUCT_BY_PRODUCT_ID, {
		variables: { productID: Number(props.id) },
	});

	const product = data?.getProductByProductID;
	if (loading)
		return (
			<div>
				<LoadingAnimation />
			</div>
		);
	if (error)
		return (
			<div>
				<ErrorMessage />
			</div>
		);

	return <ProductCard item={product} />;
}
