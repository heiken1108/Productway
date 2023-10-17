import { IProduct } from '../../data/types';
import { useParams } from 'react-router-dom';
import './CategoryPage.css';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { GET_PRODUCTS_BY_CATEGORY } from '../../queries';
import { useQuery } from '@apollo/client';

export default function CategoryPage() {
	const { categoryName } = useParams();
	const { loading, error, data } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
		variables: { category: categoryName },
	});
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	const products = data.getProductsByCategory;

	return (
		<>
			<h1 className="title">
				Siden for <strong>{categoryName?.toLowerCase()}</strong>
			</h1>
			<div className="ProductsContainer">
				{products.map((product: IProduct) => {
					return <ProductCard item={product} />;
				})}
			</div>
		</>
	);
}
