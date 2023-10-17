import './Productpage.css';
import { GET_PRODUCT_BY_PRODUCT_ID } from '../../queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

export default function Productpage() {
	const { id } = useParams();

	const { data, loading, error } = useQuery(GET_PRODUCT_BY_PRODUCT_ID, {
		variables: { productID: 1024 },
	});

	if (loading) {
		return <h3>{id} loading...</h3>;
	}

	if (error) {
		return <h3>Det har skjedd en feil...</h3>;
	}

	return (
		<div className="productContainer">
			<div className="productContent">
				<div className="productImage">
					<img
						src={data.getProductByProductID.image}
						alt="Image not found"
					/>
				</div>
				<div className="productInfo">
					<h1>{data.getProductByProductID.name}</h1>
					<h4>{'Merke: ' + data.getProductByProductID.brand}</h4>
					<p>{data.getProductByProductID.description}</p>
					<p>
						{'Pris: kr ' +
							data.getProductByProductID.currentPrice +
							',-'}
					</p>
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
