import { useNavigate } from 'react-router-dom';

import { IProduct } from '../../data/types';
import AddToFavorite from '../AddToFavourite/AddToFavourite.tsx';

import './ProductCard.css';

export default function ProductCard({ item }: { item: IProduct }) {
	const navigate = useNavigate();
	const userID = localStorage.getItem('userID') || '';

	return (
		<div className="productCardContainer">
			<div className="favoriteButtonContainer">
				<AddToFavorite
					productID={Number(item.productID)}
					userID={userID}
				/>
			</div>
			<div
				className="productCard"
				onClick={() => navigate('/project2/product/' + item.productID)}
			>
				<div className="imgDiv">
					<img src={item.image} alt={item.name} loading="lazy" />
				</div>
				<div className="textDiv">
					<h6 className="tittel">{item.name}</h6>
					<p className="prisParagraph">
						Pris: <strong>{item.currentPrice} kr</strong> @{' '}
						{item.store}
					</p>
				</div>
			</div>
		</div>
	);
}
