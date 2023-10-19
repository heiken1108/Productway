import './AllProducts.css';
import TodaysItem from '../../Components/TodaysItem/TodaysItem';
import { useNavigate } from 'react-router-dom';

const categories = [
	{
		name: 'Snacks & godteri',
		icon: 'fi fi-rr-popcorn',
	},
	{
		name: 'Personlige artikler',
		icon: 'fi fi-rr-soap',
	},
	{
		name: 'Kjøtt',
		icon: 'fi fi-rr-meat',
	},
	{
		name: 'Middag',
		icon: 'fi fi-rr-restaurant',
	},
	{
		name: 'Ost',
		icon: 'fi fi-rr-cheese',
	},
	{
		name: 'Dessert',
		icon: 'fi fi-rs-pie',
	},
	{
		name: 'Pålegg & frokost',
		icon: 'fi fi-rr-bread-slice',
	},
	{
		name: 'Middagstilbehør',
		icon: 'fi fi-rr-sauce',
	},
	{
		name: 'Drikke',
		icon: 'fi fi-rr-drink-alt',
	},
];

export default function AllStores() {
	const navigate = useNavigate();

	function handleCategoryClick(link: string) {
		navigate('/category/' + link);
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
							onClick={() => handleCategoryClick(category.name)}
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
