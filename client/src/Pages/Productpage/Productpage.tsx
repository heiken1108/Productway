// import { useParams } from 'react-router-dom';
import { IProduct } from '../../data/types';
import './Productpage.css';

const item: IProduct = {
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

export default function Productpage() {
	// const { id } = useParams();

	return (
		<div className='productContainer'>
			<div className="productContent">
				<div className="productImage">
					<img src={item.image} alt="Image not found" />
				</div>
				<div className="productInfo">
					<h1>{item.name}</h1>
					<h4>{'Merke: ' + item.brand}</h4>
					<p>{item.description}</p>
					<p>{'Pris: kr ' + item.currentPrice + ',-'}</p>
					<p>⭐⭐⭐⭐⭐</p>
				</div>
			</div>
			<div>
				{/* <h1>Kategorier</h1> */}
				{/* <CategoryCard />  Kortet finnes ikke enda...*/}
			</div>
			<div>
				{/* <h1>Lignende produkter</h1> */}
				{/* <ProductCard /> Kortet finnes ikke enda... */}
			</div>
		</div>
	);
}
