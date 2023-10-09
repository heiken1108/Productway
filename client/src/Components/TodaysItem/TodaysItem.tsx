import { IProduct } from '../../data/types';
import './TodaysItem.css';

export default function TodaysItem({ item }: { item: IProduct }) {
	return (
		<div className="todaysItem">
			<div className="imgContainer"></div>
			<img src={item.image}></img>
			<div className="infoContainer">
				<h3>{item.name}</h3>
				<p>{item.description}</p>
				<p>
					{' '}
					<strong>Gjennomsnittlig pris: {item.currentPrice}</strong>
				</p>
			</div>
		</div>
	);
}
