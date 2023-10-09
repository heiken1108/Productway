import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { IProduct } from './data/types';
import './AllProducts.css'
import TodaysItem from './Components/TodaysItem/TodaysItem';

export default function AllStores() {
	const [products, setProducts] = useState<IProduct[]>([]);

	const { isLoading, isError } = useQuery({
		queryKey: ['Products'],
		queryFn: () =>
			fetch('http://localhost:3001/getProducts', {}).then(res =>
				res.json(),
			),
		onSuccess: rawData => {
			const allProducts: IProduct[] = [];
			rawData.map(
				(raw: {
					productID: number;
					name: string;
					brand: string;
					ean: string;
					image: string;
					category: any
					store: string;
					description: any;
					currentPrice: any;
					weight: any;
					weightUnit: any;
				}) => {
					const product: IProduct = {
						productID: raw.productID,
						name: raw.name,
						brand: raw.brand,
						ean: raw.ean,
						image: raw.image,
						category: raw.category || null,
						store: raw.store,
						description: raw.description || null,
						currentPrice: raw.currentPrice || null,
						weight: raw.weight || null,
						weightUnit: raw.weightUnit || null,
					};
					allProducts.push(product);
				},
			);
			setProducts(allProducts);
		},
	});

	if (isLoading)
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		);

	if (isError)
		return (
			<div>
				<h1>Error</h1>
			</div>
		);

	const firstelement = products[997] as IProduct
	
	return (
		<div className='mainContainer'>
			<div className='todaysItemContainer'>
				<h2>Velkommen! Her er dagens produkt:</h2>
				<div className='cardContainer'>
					<TodaysItem item={firstelement}/>
				</div>
			</div>
			<div className='allProductsContainer'>
				<h2> Alle produkter </h2>
				{products.map(product => (
					<div>
						<p>{product.brand}</p>
						<p>{product.category}</p>
						<p>{product.currentPrice}</p>
						<p>{product.description}</p>
						<p>{product.ean}</p>
						<p>{product.image}</p>
						<p>{product.name}</p>
						<p>{product.productID}</p>
						<p>{product.store}</p>
						<p>{product.weight}</p>
						<p>{product.weightUnit}</p>
					</div>
				))}
			</div>
		</div>
	);
}
