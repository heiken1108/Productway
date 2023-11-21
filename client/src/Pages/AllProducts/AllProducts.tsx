import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import TodaysItem from '../../Components/TodaysItem/TodaysItem';
import categories from '../../data/categories';
import { categoryFilterState } from '../../store/atoms';

import './AllProducts.css';

/**
 * This component is the page for all products
 */
export default function AllProducts() {
	const navigate = useNavigate();

	const setCategoryData = useSetRecoilState(categoryFilterState);

	/**
	 * function for handling the click on a category
	 * @param key - The key of the category that is clicked
	 */
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
		navigate('/project2/results');
	}

	let keycounter = 1;

	return (
		<div className="mainContainer">
			<div className="todaysItemContainer">
				<h2>Velkommen! Her er ditt anbefalte produkt:</h2>
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
