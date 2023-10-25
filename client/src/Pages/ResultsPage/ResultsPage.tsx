import { IProduct } from '../../data/types';
import { GET_PRODUCT_BY_FILTERS } from '../../queries';
import { useQuery } from '@apollo/client';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { useRecoilValue } from 'recoil';
import { serchTermForResultPageState } from '../../store/atoms';
import ErrorContainer from '../../Components/Error/ErrorContainer';
import LoadingContainer from '../../Components/Loading/LoadingContainer';

export default function CategoryPage() {
	const searchTerm = useRecoilValue(serchTermForResultPageState);
	const category = undefined;
	const minPrice = undefined;
	const maxPrice = undefined;

	/**
	 * @description Query to get products by filters. Returns a list of products called data Can be accessed by data.getProductsByFilters
	 */
	const { loading, error, data } = useQuery(GET_PRODUCT_BY_FILTERS, {
		variables: {
			search: searchTerm,
			category: category,
			minPrice: minPrice,
			maxPrice: maxPrice,
		},
	});

	if (loading) return <LoadingContainer />;
	if (error) return <ErrorContainer />;

	const products = data.getProductsByFilters;

	return (
		<>
			<div className="ProductsContainer">
				{products.map((product: IProduct) => {
					return (
						<ProductCard item={product} key={product.productID} />
					);
				})}
			</div>
		</>
	);
}
