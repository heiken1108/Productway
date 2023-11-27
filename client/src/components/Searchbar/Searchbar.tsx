import { useEffect, useState } from 'react';

import { QueryResult, useQuery } from '@apollo/client';
import { Autocomplete } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { IProduct } from '../../data/types';
import { GET_PRODUCTS_BY_SEARCHTERM } from '../../graphql/queries';
import {
	resetSearchBarState,
	searchTermState,
	serchTermForResultPageState,
} from '../../store/atoms';

import './Searchbar.css';

/**
 * A search bar component that allows users to search for products.
 */
export default function SearchBar(): JSX.Element {
	// Local state for the search bar component

	const searchTermFromSessionStorage = sessionStorage.getItem('searchTerm');
	const [open, setOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);
	const [debouncedValue, setDebouncedValue] = useState(searchTerm);
	const setSerchTermForResultPage = useSetRecoilState(
		serchTermForResultPageState,
	);

	const resetSearchBar = useRecoilValue(resetSearchBarState);

	// React Router hook for navigation
	const navigate = useNavigate();

	// Apollo Client hook for fetching data
	const { data, loading }: QueryResult<{ getProductsBySearch: IProduct[] }> =
		useQuery(GET_PRODUCTS_BY_SEARCHTERM, {
			variables: { search: debouncedValue },
			skip: !debouncedValue,
		});

	// Extract the products from the query result
	const products = data?.getProductsBySearch || [];

	useEffect(() => {
		if (searchTermFromSessionStorage !== null) {
			setSearchTerm(searchTermFromSessionStorage);
		}
	}, [searchTermFromSessionStorage, setSearchTerm]);

	useEffect(() => {
		setSearchTerm('');
	}, [resetSearchBar, setSearchTerm]);

	/**
	 * A hook that debounces the search term state to avoid making too many requests to the server.
	 */
	useEffect(() => {
		const debouncer = setTimeout(() => {
			setDebouncedValue(searchTerm);
			sessionStorage.setItem('searchTerm', searchTerm);
		}, 1000);

		// Clear the timeout when the component unmounts or when the search term changes.
		return () => {
			clearTimeout(debouncer);
		};
	}, [searchTerm]);

	return (
		<div className="searchBar">
			<Autocomplete
				aria-label="Searchbar"
				data-testid="SearchBar"
				open={open}
				onOpen={() => {
					setOpen(true);
				}}
				onClose={() => {
					setOpen(false);
				}}
				inputValue={searchTerm}
				onInputChange={(_e, value) => {
					setSearchTerm(value);
					if (!value) {
						setOpen(false);
					}
				}}
				options={loading ? [] : products}
				freeSolo
				placeholder="Søk etter produkter..."
				getOptionLabel={(option: string | IProduct) => {
					if (typeof option === 'string') {
						return option;
					}
					return option.name;
				}}
				onChange={(_event, newValue) => {
					if (newValue) {
						navigate('/project2/results');
					}
				}}
				style={{
					height: '3.5rem',
					backgroundColor: 'white',
					borderRadius: '15px',
				}}
				onKeyDown={event => {
					if (event.key === 'Enter') {
						setSerchTermForResultPage(searchTerm);
						sessionStorage.setItem('searchTerm', searchTerm);
						navigate('/project2/results');
					}
				}}
			/>
		</div>
	);
}
