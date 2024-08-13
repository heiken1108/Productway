import { useNavigate } from 'react-router-dom';

import headerIcon from '../../assets/header-icon.svg';
import MyPageButton from '../MyPageButton/MyPageButton';
import Searchbar from '../Searchbar/Searchbar';

import './Header.css';
/*
 * This component is the header of the website.
 */
export default function Header() {
	const navigate = useNavigate();
	function handleNavHome() {
		navigate('/');
	}
	return (
		<div className="Header">
			<div className="desktopHeader">
				<img
					src={headerIcon}
					alt="Header Icon"
					aria-label="Home"
					className="header-icon"
					onClick={() => handleNavHome()}
				/>{' '}
				<h1
					className="header-title"
					aria-label="Home"
					data-testid="Productway-logo"
					onClick={() => handleNavHome()}
				>
					PRODUCTWAY
				</h1>
				<div className="header-spacer">
					<Searchbar />
				</div>
				<div className="search-and-button">
					<MyPageButton />
				</div>
			</div>
			<div className="mobileSearchBar">
				<div className="mobileSpacer">
					<Searchbar />
				</div>
			</div>
		</div>
	);
}
