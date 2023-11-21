import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { GET_RANDOM_ITEM } from '../../graphql/queries';
import { navigateHistory } from '../../store/atoms';
import ErrorMessage from '../Error/ErrorMessage';
import LoadingAnimation from '../Loading/LoadingAnimation';
import './TodaysItem.css';

/**
 * This component is a container for the chosen product of the day.
 */
export default function TodaysItem() {
	const navigate = useNavigate();
	const { data, loading, error } = useQuery(GET_RANDOM_ITEM);
	const setPrevPage = useSetRecoilState(navigateHistory);

	/**
	 * Function for handling navigating on click, also contain setting the previous
	 * page so that the backbutton on productpage will redirect to the right page
	 */
	function handleNavigate() {
		setPrevPage('/project2/');
		navigate('/project2/product/' + data.getRandomItem.productID);
	}

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
			onClick={() => handleNavigate()}
			data-testid="TodaysItem"
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
						Gjennomsnittlig pris: {data.getRandomItem.currentPrice}{' '}
						kr
					</strong>
				</p>
			</div>
		</div>
	);
}
