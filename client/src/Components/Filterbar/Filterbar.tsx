import { Chip, IconButton, Slider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Cancel';
import './Filterbar.css';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
	categoryFilterState,
	serchTermForResultPageState,
	sliderFilterState,
	sortingFilterState,
} from '../../store/atoms';
import { useState } from 'react';

function Filterbar() {
	const [categoryData, setCategoryData] = useRecoilState(categoryFilterState);
	const [filterData, setFilterData] = useRecoilState(sortingFilterState);
	const setSliderValue = useSetRecoilState(sliderFilterState);
	const [tempSliderValue, setTempSliderValue] = useState([0, 200]);
	const [searchTerm, setSearchTerm] = useRecoilState(
		serchTermForResultPageState,
	);

	const toggleCategoryChip = (key: number) => {
		setCategoryData(prevChipData => {
			return prevChipData.map(chip =>
				chip.key === key
					? { ...chip, showStatus: !chip.showStatus }
					: chip,
			);
		});
	};

	const toggleFilterChip = (key: number) => {
		setFilterData(prevChipData => {
			return prevChipData.map(chip =>
				chip.key === key
					? { ...chip, showStatus: !chip.showStatus }
					: { ...chip, showStatus: false },
			);
		});
	};

	const handleCommitedChange = () => {
		setSliderValue(tempSliderValue);
	};

	const handleSliderChange = (_event: Event, newValue: number | number[]) => {
		setTempSliderValue(newValue as number[]);
	};

	function handleDeleteSearch() {
		setSearchTerm('');
	}

	function valuetext(value: number) {
		return `${value}`;
	}

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
					{filterData.map(filter => (
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
