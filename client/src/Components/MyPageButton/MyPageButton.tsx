import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './MyPageButton.css';

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
				size="medium"
				sx={{ background: '#287094' }}
			>
				My page
			</Button>
		</div>
	);
}
