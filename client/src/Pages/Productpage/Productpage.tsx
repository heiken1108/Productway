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
