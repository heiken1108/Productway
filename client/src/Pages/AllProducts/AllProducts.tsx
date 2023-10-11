import { IProduct } from '../../data/types';
import './AllProducts.css';
import TodaysItem from '../../Components/TodaysItem/TodaysItem';
import { useNavigate } from 'react-router-dom';

const todaysItem: IProduct = {
	//Mock data. Will be changed with data from backend
	brand: 'Nestle',
	category: [
		'Pålegg & frokost',
		'Frokostblandinger og musli',
		'Frokostblanding',
	],
	currentPrice: 54.9,
	description:
		'Gi hele familien en god start på dagen! \nHavre Cheerios er sprø \
	fullkornsringer med 92% fullkorn og et høyt innhold av fiber. Produktet er også \
	nøkkelhullsmerket.',
	ean: '5900020037046',
	image: 'https://bilder.ngdata.no/5900020037046/kmh/large.jpg',
	name: 'Cheerios Havre 375g Nestle',
	productID: 1011,
	store: 'Joker',
	weight: 375,
	weightUnit: 'g',
};

const categories = [
	{
		name: 'Snacks & Godteri',
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
		name: 'Pålegg & Frokost',
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

	return (
		<div className="mainContainer">
			<div className="todaysItemContainer">
				<h2>Velkommen! Her er dagens produkt:</h2>
				<div
					className="cardContainer"
					onClick={() => navigate('/product/12')}
				>
					<TodaysItem item={todaysItem} />
				</div>
				<h2> Alle produkter </h2>
			</div>
			<div className="allProductsContainer">
				<div className="categoryGrid">
					{categories.map(category => (
						<div
							className="categoryCard"
							onClick={() =>
								handleCategoryClick(category.name.toLowerCase())
							}
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
