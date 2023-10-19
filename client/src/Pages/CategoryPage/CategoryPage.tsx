import { IProduct } from '../../data/types';
import { useParams } from 'react-router-dom';
import './CategoryPage.css';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { GET_PRODUCTS_BY_CATEGORY } from '../../queries';
import { useQuery } from '@apollo/client';
import LoadingContainer from '../../Components/Loading/LoadingContainer';
import ErrorContainer from '../../Components/Error/ErrorContainer';

export default function CategoryPage() {
	const { categoryName } = useParams();
	const { loading, error, data } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
		variables: { category: categoryName },
	});
	if (loading) return <LoadingContainer />;
	if (error) return <ErrorContainer />;

	const products = data.getProductsByCategory;

	let keycounter = 1;

	return (
		<>
			<h1 className="title">
				Siden for <strong>{categoryName?.toLowerCase()}</strong>
			</h1>
			<div className="ProductsContainer">
				{products.map((product: IProduct) => {
					return <ProductCard key={keycounter++} item={product} />;
				})}
			</div>
		</>
	);
}
