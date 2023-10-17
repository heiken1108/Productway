import AddToShoppingcart from '../AddToShoppingcart/AddToShoppingcart';
import './TodaysItem.css';
import { GET_PRODUCT_BY_PRODUCT_ID } from '../../queries';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

export default function TodaysItem() {
	const navigate = useNavigate();
	const { data, loading, error } = useQuery(GET_PRODUCT_BY_PRODUCT_ID, {
		variables: { productID: 1024 },
	});

	if (loading) {
		return <h1>Loading...</h1>;
	}

	if (error) {
		return <h1>Det har skjedd en feil...</h1>;
	}

	return (
		<div
			className="todaysItem"
			onClick={() =>
				navigate('/product/' + data.getProductByProductID.productID)
			}
		>
			<div className="imgContainer"></div>
			<img src={data.getProductByProductID.image}></img>
			<div className="infoContainer">
				<h3>{data.getProductByProductID.name}</h3>
				<p>{data.getProductByProductID.description}</p>
				<p>
					{' '}
					<strong>
						Gjennomsnittlig pris:{' '}
						{data.getProductByProductID.currentPrice}
					</strong>
				</p>
				<AddToShoppingcart id={data.getProductByProductID.productID} />
			</div>
		</div>
	);
}
