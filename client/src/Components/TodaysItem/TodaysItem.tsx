import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { GET_RANDOM_ITEM } from '../../queries';
import ErrorMessage from '../Error/ErrorMessage';
import LoadingAnimation from '../Loading/LoadingAnimation';

import './TodaysItem.css';

export default function TodaysItem() {
	const navigate = useNavigate();
	const { data, loading, error } = useQuery(GET_RANDOM_ITEM);

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
				navigate('/project2/product/' + data.getRandomItem.productID)
			}
		>
			<div className="todayImgContainer">
				<img loading="lazy" src={data.getRandomItem.image}></img>
			</div>
			<div className="infoContainer">
				<h3>{data.getRandomItem.name}</h3>
				<p>{data.getRandomItem.description}</p>
				<p>
					{' '}
					<strong>
						Gjennomsnittlig pris: {data.getRandomItem.currentPrice}
					</strong>
				</p>
			</div>
		</div>
	);
}
