import { IProduct } from '../../data/types';
import {
	GET_COUNT_PRODUCTS_BY_FILTERS,
	GET_PRODUCT_BY_FILTERS_WITH_LIMIT,
} from '../../queries';
import { useQuery } from '@apollo/client';
import ProductCard from '../../Components/ProductCard/ProductCard';
import './ResultsPage.css';
import { useRecoilValue } from 'recoil';
import {
	categoryFilterState,
	serchTermForResultPageState,
	sliderFilterState,
	sortingFilterState,
} from '../../store/atoms';
import ErrorContainer from '../../Components/Error/ErrorContainer';
import LoadingContainer from '../../Components/Loading/LoadingContainer';
import Filterbar from '../../Components/Filterbar/Filterbar';
import './ResultsPage.css';
import { useEffect, useState } from 'react';
import { Pagination, Stack } from '@mui/material';

export default function ResultsPage() {
	const searchTerm = useRecoilValue(serchTermForResultPageState);
	const minPrice = useRecoilValue(sliderFilterState)[0];
	const maxPrice = useRecoilValue(sliderFilterState)[1];
	const descendingOrder = useRecoilValue(sortingFilterState)[0].showStatus;
	const ascendingOrder = useRecoilValue(sortingFilterState)[1].showStatus;
	const sortOrder = descendingOrder ? 1 : ascendingOrder ? -1 : 0;
	const limit = 12;
	const [currentPage, setCurrentPage] = useState(1);
	const categoryFilter = useRecoilValue(categoryFilterState);

	const selectedCategories = categoryFilter
		.filter(category => category.showStatus)
		.map(category => category.name);

	const {
		data: products,
		loading: productsLoading,
		error: productsError,
	} = useQuery(GET_PRODUCT_BY_FILTERS_WITH_LIMIT, {
		variables: {
			searchTerm: searchTerm,
			categories: selectedCategories,
			minPrice: minPrice,
			maxPrice: maxPrice,
			sortOrder: sortOrder,
			limit: limit,
			page: currentPage,
		},
	});

	const {
		data: numberOfProducts,
		loading: countLoading,
		error: countError,
	} = useQuery(GET_COUNT_PRODUCTS_BY_FILTERS, {
		variables: {
			searchTerm: searchTerm,
			categories: selectedCategories,
			minPrice: minPrice,
			maxPrice: maxPrice,
		},
	});

	const numberOfPages =
		numberOfProducts && products
			? Math.ceil(numberOfProducts.getCountProductsByFilters / limit)
			: 1;

	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, categoryFilter, minPrice, maxPrice, sortOrder]);

	const handlePageChange = (
		_event: React.ChangeEvent<unknown>,
		page: number,
	) => {
		setCurrentPage(page);
	};

	return (
		<>
			<Filterbar />
			{productsLoading && <LoadingContainer />}
			{productsError && <ErrorContainer />}
			{products &&
			products.getProductsByFiltersWithLimit.length > 0 &&
			!productsLoading ? (
				<div>
					<div className="productsContainer">
						{products.getProductsByFiltersWithLimit.map(
							(product: IProduct) => (
								<ProductCard
									item={product}
									key={product.productID}
								/>
							),
						)}
					</div>
					<div className="buttonContainer">
						{countLoading ? (
							<p>Loading...</p>
						) : countError ? (
							<p>Feil med innlasting av antall varer</p>
						) : (
							<Stack spacing={2}>
								<Pagination
									count={numberOfPages}
									page={currentPage}
									onChange={handlePageChange}
								/>
							</Stack>
						)}
					</div>
				</div>
			) : (
				!productsLoading && (
					<div className="noItems">
						<strong>
							{'Ingen produkter matcher søket ditt :('}
						</strong>
					</div>
				)
			)}
		</>
	);
}
