import { useEffect, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Cancel';
import { Chip, IconButton, Slider } from '@mui/material';
import './Filterbar.css';
import { useRecoilState, useSetRecoilState } from 'recoil';

import {
	categoryFilterState,
	resetSearchBarState,
	serchTermForResultPageState,
	sliderFilterState,
	sortingFilterState,
} from '../../store/atoms';

function Filterbar() {
	// Local state for the filter bar components from session storage. To ensure that the filter bar is persistent when navigating between pages.
	const searchTermFromSessionStorage = sessionStorage.getItem('searchTerm');
	const storedPriceRangeValue = sessionStorage.getItem('sliderValue');
	const sortOrderFromSessionStorage = sessionStorage.getItem('sortOrder');
	const categoryDataFromSessionStorage =
		sessionStorage.getItem('categoryData');

	// Recoil state for the filter bar components
	const setSliderValue = useSetRecoilState(sliderFilterState);
	const [categoryData, setCategoryData] = useRecoilState(categoryFilterState);
	const [sortingFilterData, setSortingFilterData] =
		useRecoilState(sortingFilterState);
	const [searchTerm, setSearchTerm] = useRecoilState(
		serchTermForResultPageState,
	);

	// Recoil state to empty the searchbar when removing the search term
	const [resetSearchBar, setResetSearchBar] =
		useRecoilState(resetSearchBarState);

	// Local state for the filter slider component. If localstorrage is empty, set the initial value to [0, 200]
	const initialValue = storedPriceRangeValue
		? JSON.parse(storedPriceRangeValue)
		: [0, 200];

	// Temporary state for the filter slider component. To prevent queries before the slider bar is released
	const [tempSliderValue, setTempSliderValue] = useState(initialValue);

	// Set the sort order from session storage
	useEffect(() => {
		if (sortOrderFromSessionStorage !== null) {
			setSortingFilterData(JSON.parse(sortOrderFromSessionStorage));
		}
	}, [setSortingFilterData, sortOrderFromSessionStorage]);

	// Set the category filters from session storage
	useEffect(() => {
		if (categoryDataFromSessionStorage !== null) {
			setCategoryData(JSON.parse(categoryDataFromSessionStorage));
		}
	}, [setCategoryData, categoryDataFromSessionStorage]);

	// Set the search term from session storage
	useEffect(() => {
		if (searchTermFromSessionStorage !== null) {
			setSearchTerm(searchTermFromSessionStorage);
		}
	}, [searchTermFromSessionStorage, setSearchTerm]);

	/**
	 * Toggles the showStatus property of a category chip with the given key.
	 * @param key - The key of the category chip to toggle.
	 */
	const toggleCategoryChip = (key: number) => {
		setCategoryData(prevChipData => {
			const newChipData = prevChipData.map(chip =>
				chip.key === key
					? { ...chip, showStatus: !chip.showStatus }
					: chip,
			);
			sessionStorage.setItem('categoryData', JSON.stringify(newChipData));
			return newChipData;
		});
	};

	/**
	 * Toggles the showStatus property of a sorting filter chip with the given key.
	 * @param key - The key of the sorting filter chip to toggle.
	 */
	const toggleFilterChip = (key: number): void => {
		setSortingFilterData(prevChipData => {
			const newChipData = prevChipData.map(chip =>
				chip.key === key
					? { ...chip, showStatus: !chip.showStatus }
					: { ...chip, showStatus: false },
			);
			sessionStorage.setItem('sortOrder', JSON.stringify(newChipData));
			return newChipData;
		});
	};

	/**
	 * Sets the slider value to the temporary slider value when the slider bar is released.
	 */
	const handleCommitedChange = () => {
		sessionStorage.setItem('sliderValue', JSON.stringify(tempSliderValue));
		setSliderValue(tempSliderValue);
	};

	/**
	 * Sets the temporary slider value when the slider bar is moved.
	 * @param _event - The event that triggered the change.
	 * @param newValue - The new value of the slider bar.
	 */
	const handleSliderChange = (_event: Event, newValue: number | number[]) => {
		setTempSliderValue(newValue as number[]);
	};

	/**
	 * Removes the search term from session storage and resets the search bar.
	 */
	const handleDeleteSearch = () => {
		sessionStorage.removeItem('searchTerm');
		setResetSearchBar(!resetSearchBar);
		setSearchTerm('');
	};

	/**
	 * Returns the value of the slider bar as a string.
	 * @param value - The value of the slider bar.
	 * @returns The value of the slider bar as a string.
	 */
	const valuetext = (value: number) => {
		return `${value}`;
	};

	return (
		<div className="filterChips">
			<h3>Kategori</h3>
			<div className="chips">
				{categoryData.map(filter => (
					<Chip
						key={filter.key}
						label={filter.name}
						icon={<i className={filter.icon} />}
						variant={filter.showStatus ? 'filled' : 'outlined'}
						onClick={() => toggleCategoryChip(filter.key)}
					/>
				))}
			</div>
			<h3>Sortering</h3>
			<div className="filtercontainer">
				<div className="filter">
					{sortingFilterData.map(filter => (
						<Chip
							key={filter.key}
							label={filter.name}
							icon={<i className={filter.icon} />}
							variant={filter.showStatus ? 'filled' : 'outlined'}
							onClick={() => toggleFilterChip(filter.key)}
						/>
					))}
				</div>
				<div className="sliderContainer">
					<p> Minimal pris</p>
					<div className="slider">
						<Slider
							value={tempSliderValue}
							onChange={handleSliderChange}
							onChangeCommitted={handleCommitedChange}
							valueLabelDisplay="auto"
							getAriaValueText={valuetext}
							max={200}
						/>
					</div>
					<p>Maksimal pris</p>
				</div>
			</div>
			{searchTerm && (
				<div className="searchTerm">
					<p>
						{' '}
						Resultater for søkeord: <strong> {searchTerm} </strong>
					</p>
					<IconButton
						aria-label="delete"
						onClick={handleDeleteSearch}
					>
						<DeleteIcon />
					</IconButton>
				</div>
			)}
		</div>
	);
}

export default Filterbar;
