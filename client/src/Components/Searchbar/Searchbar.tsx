import { useQuery, QueryResult } from '@apollo/client';
import { Autocomplete } from '@mui/joy';
import { GET_PRODUCTS_BY_SEARCHTERM } from '../../queries';
import { useEffect, useState } from 'react';
import { IProduct } from '../../data/types';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
	searchTermState,
	serchTermForResultPageState,
} from '../../store/atoms';

/**
 * A search bar component that allows users to search for products.
 */
export default function SearchBar(): JSX.Element {
	// Local state for the search bar component
	const [open, setOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);
	const [debouncedValue, setDebouncedValue] = useState(searchTerm);
	const setSerchTermForResultPage = useSetRecoilState(
		serchTermForResultPageState,
	);

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

	/**
	 * A hook that debounces the search term state to avoid making too many requests to the server.
	 */
	useEffect(() => {
		const debouncer = setTimeout(() => {
			setDebouncedValue(searchTerm);
		}, 1000);

		// Clear the timeout when the component unmounts or when the search term changes.
		return () => {
			clearTimeout(debouncer);
		};
	}, [searchTerm]);

	return (
		<div>
			<Autocomplete
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
						navigate('/results');
					}
				}}
				style={{
					height: '3.5rem',
					backgroundColor: 'white',
					width: '500px',
				}}
				onKeyDown={event => {
					if (event.key === 'Enter') {
						setSerchTermForResultPage(searchTerm);
						navigate('/results');
					}
				}}
			/>
		</div>
	);
}
