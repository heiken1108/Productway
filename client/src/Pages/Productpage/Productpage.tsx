// import { useParams } from 'react-router-dom';
import { IProduct } from '../../data/types';
import './Productpage.css';
import { GET_PRODUCT_BY_PRODUCT_ID } from '../../queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

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

function getProductById(id: number) {
	const { loading, error, data } = useQuery(GET_PRODUCT_BY_PRODUCT_ID, {
		variables: { productID: id }, 
	});
	
	if (loading || !data) {
		return dummyItem;
	}
	
	const product = data.getProductByProductID;
	const item: IProduct = {
		brand: product.brand,
		category: product.category,
		currentPrice: product.currentPrice,
		description: product.description,
		ean: product.ean,
		image: product.image,
		name: product.name,
		productID: product.productID,
		store: product.store,
		weight: product.weight,
		weightUnit: product.weightUnit,
	};
	console.log(item);
	return item;
}

export default function Productpage() {
	const { id } = useParams();

	const item = getProductById(Number(id));
	

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
