import './Header.css';
import { useNavigate } from 'react-router-dom';
import headerIcon from '../../assets/header-icon.svg';
import Searchbar from '../Searchbar/Searchbar.tsx';
import { IProduct } from '../../data/types';
import ShoppingButton from '../ShoppingButton/ShoppingButton.tsx';

export default function Header({ products }: { products: IProduct[] }) {
	const navigate = useNavigate();

	function handleNavHome() {
		navigate('/');
	}

	return (
		<div onClick={() => handleNavHome()} className="Header">
			<img src={headerIcon} alt="Header Icon" className="header-icon" />{' '}
			<h1 className="header-title">
				{' '}
				PRODUCTWAY
			</h1>
			<div className="header-spacer">
				<Searchbar products={products} />
			</div>
			<div className="search-and-button">
				<ShoppingButton />
			</div>
		</div>
	);
}
