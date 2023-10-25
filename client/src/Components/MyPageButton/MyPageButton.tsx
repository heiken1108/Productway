import { useNavigate } from 'react-router-dom';
import './MyPageButton.css';
import { Button } from '@mui/material';

/*
 * This component is a button that navigates to the MyPage component.
 */
export default function MyPageButton() {
	const navigate = useNavigate();
	function handleNavShopping() {
		navigate('/MyPage');
	}
	return (
		<div className="MyPageButton">
			<Button
				variant="contained"
				onClick={handleNavShopping}
				size="large"
				sx={{ background: '#1c326e49' }}
			>
				My page
			</Button>
		</div>
	);
}
