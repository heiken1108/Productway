import './Header.css';
import { useNavigate } from 'react-router-dom';
import headerIcon from '../../assets/header-icon.svg';
import ShoppingButton from '../ShoppingButton/ShoppingButton.tsx';
import Searchbar from '../Searchbar/Searchbar.tsx';

export default function Header() {
	const navigate = useNavigate();

	function handleNavHome() {
		navigate('/');
	}

	return (
		<div className="Header">
			<img
				src={headerIcon}
				alt="Header Icon"
				className="header-icon"
				onClick={() => handleNavHome()}
			/>{' '}
			<h1 className="header-title" onClick={() => handleNavHome()}>
				{' '}
				PRODUCTWAY
			</h1>
			<div className="header-spacer">
				<Searchbar />
			</div>
			<div className="search-and-button">
				<ShoppingButton />
			</div>
		</div>
	);
}
