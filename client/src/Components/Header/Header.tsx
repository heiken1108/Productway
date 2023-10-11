import './Header.css';
import { useNavigate } from 'react-router-dom';
import headerIcon from '../../assets/header-icon.svg';
import Searchbar from '../Searchbar/Searchbar.tsx';
import { IProduct } from '../../data/types';

export default function Header({ products }: { products: IProduct[] }) {
	const navigate = useNavigate();

	function handleNavHome() {
		navigate('/');
	}

	return (
		<div className="Header">
			<img src={headerIcon} alt="Header Icon" className="header-icon" />{' '}
			{/* Use the imported SVG */}
			<h1 onClick={() => handleNavHome()} className="header-title">
				{' '}
				PRODUCTWAY
			</h1>
			<div className="header-spacer">
				<Searchbar products={products} />
			</div>
		</div>
	);
}
