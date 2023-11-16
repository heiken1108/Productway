import { useEffect, useRef} from 'react';

import { useQuery } from '@apollo/client';
import { Pagination, Stack } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';

import ErrorContainer from '../../Components/Error/ErrorContainer';
import Filterbar from '../../Components/Filterbar/Filterbar';
import LoadingContainer from '../../Components/Loading/LoadingContainer';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { IProduct } from '../../data/types';
import {
	GET_COUNT_PRODUCTS_BY_FILTERS,
	GET_PRODUCT_BY_FILTERS_WITH_LIMIT,
} from '../../queries';
import {
	categoryFilterState,
	pageHistory,
	serchTermForResultPageState,
	sliderFilterState,
	sortingFilterState,
	navigateHistory
} from '../../store/atoms';

import './ResultsPage.css';

export default function ResultsPage() {
	//Recoil state search variables
	const searchTerm = useRecoilValue(serchTermForResultPageState);
	const minPrice = useRecoilValue(sliderFilterState)[0];
	const maxPrice = useRecoilValue(sliderFilterState)[1];
	const descendingOrder = useRecoilValue(sortingFilterState)[0].showStatus;
	const ascendingOrder = useRecoilValue(sortingFilterState)[1].showStatus;
	const categoryFilter = useRecoilValue(categoryFilterState);
	const [prevPage, setPrevPage] = useRecoilState(navigateHistory)

	// Global state for pagination, to keep track of right page if returned from productpage
	const [currentPage, setCurrentPage] = useRecoilState(pageHistory);

	// Sort order for the query. 1 = descending, -1 = ascending, 0 = no sorting
	const sortOrder = descendingOrder ? 1 : ascendingOrder ? -1 : 0;

	// Number of products to be displayed per page
	const limit = 12;

	// Reset the current page to 1 when the search term or the category filter changes
	const isFirstRender = useRef(true);

	useEffect(() => {
	  if (isFirstRender.current) {
		isFirstRender.current = false;
		return;
	  }
	
	  if (prevPage && prevPage.substring(0, 18) !== '/project2/product/') {
		setCurrentPage(1);
		setPrevPage("");
	  }
	}, [searchTerm, categoryFilter, minPrice, maxPrice, sortOrder]);
	
	  

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// Filter the categories to only show the ones that are selected
	const selectedCategories = categoryFilter
		.filter(category => category.showStatus)
		.map(category => category.name);

	// Apollo Client hook for fetching data
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

	// Apollo Client hook for fetching the number of products that match the search term and the filters
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

	// Number of pages calculated from the number of products and the limit
	const numberOfPages =
		numberOfProducts && products
			? Math.ceil(numberOfProducts.getCountProductsByFilters / limit)
			: 1;

	/**
	 * Handles the change of the current page in the pagination component.
	 * @param _event - The event that triggered the page change.
	 * @param page - The new page number.
	 */
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
					<div className="centerContainer">
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
				!productsLoading &&
				!productsError && (
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
