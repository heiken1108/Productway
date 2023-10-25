import './TodaysItem.css';
import { GET_PRODUCT_BY_PRODUCT_ID } from '../../queries';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../Error/ErrorMessage';
import LoadingAnimation from '../Loading/LoadingAnimation';

export default function TodaysItem() {
	const navigate = useNavigate();
	const { data, loading, error } = useQuery(GET_PRODUCT_BY_PRODUCT_ID, {
		variables: { productID: 1024 },
	});

	if (loading)
		return (
			<div
				className="todaysItem"
				style={{ display: 'flex', justifyContent: 'center' }}
			>
				<LoadingAnimation />
			</div>
		);
	if (error)
		return (
			<div
				className="todaysItem"
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<ErrorMessage />
			</div>
		);

	return (
		<div
			className="todaysItem"
			onClick={() =>
				navigate('/product/' + data.getProductByProductID.productID)
			}
		>
			<div className="imgContainer"></div>
			<img loading="lazy" src={data.getProductByProductID.image}></img>
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
			</div>
		</div>
	);
}
