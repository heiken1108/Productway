import { useNavigate } from 'react-router-dom';
import './ShoppingButton.css';

export default function ShoppingButton() {
	const navigate = useNavigate();

	function handleNavShopping() {
		navigate('/shoppingcart');
	}
	return (
		<div className="ShoppingButton" onClick={handleNavShopping}>
			<i className="fi fi-rr-shopping-cart"></i>
		</div>
	);
}
