import { useNavigate } from 'react-router-dom';

import headerIcon from '../../assets/header-icon.svg';
import MyPageButton from '../MyPageButton/MyPageButton.tsx';
import Searchbar from '../Searchbar/Searchbar.tsx';

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
				<MyPageButton />
			</div>
		</div>
	);
}
