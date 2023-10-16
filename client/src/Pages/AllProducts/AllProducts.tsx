import { IProduct } from '../../data/types';
import './AllProducts.css';
import TodaysItem from '../../Components/TodaysItem/TodaysItem';
import { useNavigate } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { GET_DATA } from '../../queries';

const dummyItem: IProduct = {
	brand: '',
	category: '',
	currentPrice: 0,
	description:
		'',
	ean: '',
	image: '',
	name: '',
	productID: 0,
	store: '',
	weight: 0,
	weightUnit: '',
};

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

function getAllProducts() {
	const { data, loading, error } = useQuery(GET_DATA);
	if (loading || !data) {
		return dummyItem;
	}
	const item: IProduct = {
		brand: data.getAllProducts[0].brand,
		category: data.getAllProducts[0].category,
		currentPrice: data.getAllProducts[0].currentPrice,
		description: data.getAllProducts[0].description,
		ean: data.getAllProducts[0].ean,
		image: data.getAllProducts[0].image,
		name: data.getAllProducts[0].name,
		productID: data.getAllProducts[0].productID,
		store: data.getAllProducts[0].store,
		weight: data.getAllProducts[0].weight,
		weightUnit: data.getAllProducts[0].weightUnit,
	};
	return item;
}

export default function AllStores() {
	const todaysItem = getAllProducts();
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
					onClick={() => navigate('/product/' + todaysItem.productID)}
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
								handleCategoryClick(category.name)
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
