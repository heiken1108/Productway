import { useParams } from 'react-router-dom';
import { IProduct } from '../../data/types';
import { useState } from 'react';
import './Productpage.css';

export default function Productpage() {
	const { id } = useParams();
	const [product, setProduct] = useState<IProduct>({
		productID: 12342,
		name: 'Jasminris 2kg Eldorado',
		brand: 'Eldorado',
		ean: '7311041001363',
		image: 'https://bilder.ngdata.no/7311041001363/kmh/large.jpg',
		category: ['Middag', 'Ris'],
		description:
			'Jasminris er en lett klebrig ris som er velegnet til orientalske retter. Den har en aromatisk duft og smak, og passer svært godt til asiatiske  kjøtt- og grønnsaksretter.',
		currentPrice: 49.9,
		weight: 2000,
		weightUnit: 'g',
		store: 'Meny',
	});

	// Vil bli brukt så fort backend tillater det. Enn så lenge så blir data mocket!
	// const { isLoading, isError } = useQuery({
	// 	queryKey: [`product${id}`],
	// 	queryFn: () =>
	// 		fetch('http://localhost:3001/getProduct/' + { id }).then(res =>
	// 			res.json(),
	// 		),
	// 	onSuccess: rawData => {
	// 		const product: IProduct = {
	// 			productID: rawData.data.productID,
	// 			name: rawData.data.name,
	// 			brand: rawData.data.brand,
	// 			ean: rawData.data.ean,
	// 			image: rawData.data.image,
	// 			category: rawData.data.category,
	// 			description: rawData.data.description,
	// 			currentPrice: rawData.data.currentPrice,
	// 			weight: rawData.data.weight,
	// 			weightUnit: rawData.data.weightUnit,
	// 			store: rawData.data.store,
	// 		};
	// 		setProduct(product);
	// 	},
	// });
	/*
	 * Trenger api kall som henter produktet med id
	 */

	// if (isLoading) return 'Loading...';

	// if (isError) return 'Error...';

	return (
		<div>
			<div className="productContent">
				<div className="productImage">
					<img src={product.image} alt="Image not found" />
				</div>
				<div className="productInfo">
					<h1>{product.name}</h1>
					<h4>{'Merke: ' + product.brand}</h4>
					<p>{product.description}</p>
					<p>{'Pris: kr ' + product.currentPrice + ',-'}</p>
					<p>⭐⭐⭐⭐⭐</p>
				</div>
			</div>
			<div>
				<h1>Kategorier</h1>
				{/* <CategoryCard />  Kortet finnes ikke enda...*/}
			</div>
			<div>
				<h1>Lignende produkter</h1>
				{/* <ProductCard /> Kortet finnes ikke enda... */}
			</div>
		</div>
	);
}
