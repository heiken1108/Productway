import { useNavigate } from 'react-router-dom';

import { IProduct } from '../../data/types';

import './ProductCard.css';

export default function ProductCard({ item }: { item: IProduct }) {
	const navigate = useNavigate();

	return (
		<div
			className="productCard"
			onClick={() => navigate('/product/' + item.productID)}
		>
			<div className="imgDiv">
				<img src={item.image} alt={item.name} loading="lazy" />
			</div>
			<div className="textDiv">
				<h6 className="tittel">{item.name}</h6>
				<p className="prisParagraph">
					Pris: <strong>{item.currentPrice} kr</strong> @ {item.store}
				</p>
			</div>
		</div>
	);
}
