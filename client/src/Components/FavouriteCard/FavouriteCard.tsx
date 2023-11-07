import { IProduct } from '../../data/types';
import ProductCard from '../ProductCard/ProductCard';

import './FavouriteCard.css';

/*
 * This component is a card for the favourite items.
 */
export default function FavouriteCard({ item }: { item: IProduct }) {
	return <ProductCard item={item} />;
}
