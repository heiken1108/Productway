import { IProduct } from '../../data/types';
import { GET_PRODUCT_BY_FILTERS_WITH_LIMIT } from '../../queries';
import { useQuery } from '@apollo/client';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { useEffect, useState } from 'react';
import './ResultsPage.css';
import LoadingContainer from '../../Components/Loading/LoadingContainer';
import ErrorContainer from '../../Components/Error/ErrorContainer';
import { useRecoilValue } from 'recoil';
import { serchTermForResultPageState } from '../../store/atoms';

export default function ResultsPage() {
	const searchTerm = useRecoilValue(serchTermForResultPageState);
	const category = undefined;
	const minPrice = undefined;
	const maxPrice = undefined;
	const limit = 15;
	const [pageCounter, setPageCounter] = useState(1);
	const [products, setProducts] = useState<IProduct[]>([]); // Initialize products state

	/**
	 * @description Query to get products by filters. Returns a list of products called data Can be accessed by data.getProductsByFilters
	 */
	const { loading, error, fetchMore, refetch } = useQuery(
		GET_PRODUCT_BY_FILTERS_WITH_LIMIT,
		{
			variables: {
				search: searchTerm,
				category: category,
				minPrice: minPrice,
				maxPrice: maxPrice,
				limit: limit,
				page: 1,
			},
		},
	);

	/**
	 * Function that increments pageCounter by one, which in turn fires the useEffect that loads more items
	 */
	const loadMore = () => {
		setPageCounter(pageCounter + 1);
	};

	/**
	 * useEffect that loads more items when pageCounter is incremented
	 */
	useEffect(() => {
		if (pageCounter === 1) return; // If pageCounter is 1, return
		fetchMore({
			variables: {
				page: pageCounter,
			},
		}).then(result => {
			console.log(result.data.getProductsByFiltersWithLimit);
			setProducts(prevProducts => [
				...prevProducts,
				...result.data.getProductsByFiltersWithLimit,
			]);
		});
	}, [pageCounter, setProducts, fetchMore]);

	/**
	 * useEffect that resets pageCounter to 1 when searchTerm is changed, and searches for products with the new searchTerm
	 */
	useEffect(() => {
		setPageCounter(1); // Reset pageCounter to 1 when searchTerm changes
		refetch({
			variables: {
				searchTerm: searchTerm,
				page: 1, // Set page to 1 when refetching
			},
		}).then(result => {
			setProducts(result.data.getProductsByFiltersWithLimit);
		});
	}, [searchTerm, setProducts, refetch]);

	if (loading) return <LoadingContainer />;
	if (error) return <ErrorContainer />;

	return (
		<>
			<div className="prod2">
				{products.map((product: IProduct) => (
					<ProductCard item={product} key={product.productID} />
				))}
			</div>

			<div className="ButtonContainer">
				<button className="loadButton" onClick={loadMore}>
					Last mer a!
				</button>
			</div>
		</>
	);
}
