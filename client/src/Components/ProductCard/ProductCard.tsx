import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { IProduct } from '../../data/types';
import { navigateHistory } from '../../store/atoms';
import AddToFavorite from '../AddToFavourite/AddToFavourite.tsx';
import './ProductCard.css';

/**
 * This component is a card for the products.
 * @param {IProduct} item - The product to be displayed
 */
export default function ProductCard({ item }: { item: IProduct }) {
	const navigate = useNavigate();
	const location = useLocation();
	const userID = localStorage.getItem('userID') || '';
	const setPrevPage = useSetRecoilState(navigateHistory);

	function handleNavigate() {
		setPrevPage(location.pathname);
		navigate('/project2/product/' + item.productID);
	}

	return (
		<div className="productCardContainer">
			<div className="favoriteButtonContainer">
				<AddToFavorite
					productID={Number(item.productID)}
					userID={userID}
					key={item.productID}
				/>
			</div>
			<div className="productCard" onClick={() => handleNavigate()}>
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
