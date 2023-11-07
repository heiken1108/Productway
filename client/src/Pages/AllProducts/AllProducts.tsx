import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import TodaysItem from '../../Components/TodaysItem/TodaysItem';
import { categoryFilterState } from '../../store/atoms';

import './AllProducts.css';

const categories = [
	{
		key: 0,
		name: 'Snacks & godteri',
		icon: 'fi fi-rr-popcorn',
	},
	{
		key: 1,
		name: 'Personlige artikler',
		icon: 'fi fi-rr-soap',
	},
	{
		key: 2,
		name: 'Kjøtt',
		icon: 'fi fi-rr-meat',
	},
	{
		key: 3,
		name: 'Middag',
		icon: 'fi fi-rr-restaurant',
	},
	{
		key: 4,
		name: 'Ost',
		icon: 'fi fi-rr-cheese',
	},
	{
		key: 5,
		name: 'Dessert',
		icon: 'fi fi-rs-pie',
	},
	{
		key: 6,
		name: 'Pålegg & frokost',
		icon: 'fi fi-rr-bread-slice',
	},
	{
		key: 7,
		name: 'Middagstilbehør',
		icon: 'fi fi-rr-sauce',
	},
	{
		key: 8,
		name: 'Drikke',
		icon: 'fi fi-rr-drink-alt',
	},
];

export default function AllStores() {
	const navigate = useNavigate();

	const setCategoryData = useSetRecoilState(categoryFilterState);

	function handleCategoryClick(key: number) {
		setCategoryData(prevChipData => {
			const newChipData = prevChipData.map(chip =>
				chip.key === key
					? { ...chip, showStatus: true }
					: { ...chip, showStatus: false },
			);
			sessionStorage.setItem('categoryData', JSON.stringify(newChipData));
			return newChipData;
		});
		navigate('/results');
	}

	let keycounter = 1;

	return (
		<div className="mainContainer">
			<div className="todaysItemContainer">
				<h2>Velkommen! Her er dagens produkt:</h2>
				<div className="cardContainer">
					<TodaysItem />
				</div>
				<h2> Alle produkter </h2>
			</div>
			<div className="allProductsContainer">
				<div className="categoryGrid">
					{categories.map(category => (
						<div
							key={keycounter++}
							className="categoryCard"
							onClick={() => handleCategoryClick(category.key)}
						>
							<i className={category.icon}></i>
							<p> {category.name} </p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
