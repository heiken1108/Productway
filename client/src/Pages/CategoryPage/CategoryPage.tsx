//import { useState } from 'react';
import { IProduct } from '../../data/types';
//import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import './CategoryPage.css';
import ProductCard from '../../Components/ProductCard/ProductCard';

const todaysItem: IProduct = {
	//Mock data. Will be changed with data from backend
	brand: 'Nestle',
	category: 'Pålegg & frokost',
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


export default function CategoryPage() {
	const { categoryName } = useParams();
	/*const [products, setProducts] = useState<IProduct[]>([]);
	const { categoryName } = useParams();

	return (
		<div className="categoryContainer">
			<p className="title">
				{' '}
				Siden for <strong>{categoryName}</strong>
			</p>
		</div>
	);*/
	return (
		<>
			<h1 className='title'>Siden for <strong>{categoryName}</strong></h1>
			<div className='ProductsContainer'>
				<ProductCard item={todaysItem} />
				<ProductCard item={todaysItem} />
				<ProductCard item={todaysItem} />
				<ProductCard item={todaysItem} />
				<ProductCard item={todaysItem} />
			</div>
		</>
	);
}
