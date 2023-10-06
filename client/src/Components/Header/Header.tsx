import './Header.css'
import { useNavigate } from 'react-router-dom'
import headerIcon from '../../assets/header-icon.svg';

export default function Header() {
	const navigate = useNavigate()

	function handleNavHome() {
		navigate('/project1/')
	}

	return (
		<div className="Header">
            
            <img src={headerIcon} alt="Header Icon" className="header-icon" /> {/* Use the imported SVG */}
  			<h1 onClick={() => handleNavHome()} className='header-title'> PRODUCTWAY</h1>
		</div>
	)
}
