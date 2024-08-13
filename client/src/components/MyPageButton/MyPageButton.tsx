import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './MyPageButton.css';

/*
 * This component is a button that navigates to the MyPage component.
 */
export default function MyPageButton() {
	const navigate = useNavigate();
	function handleNavShopping() {
		navigate('/myPage');
	}
	return (
		<div className="MyPageButton">
			<Button
				aria-label="My Page"
				variant="contained"
				onClick={handleNavShopping}
				size="medium"
				data-testid="MyPageButton"
				sx={{
					background: '#287094',
					borderRadius: '15px', // Add this line for border radius
					'&:focus': { outline: 'none' },
				}}
			>
				Min side
			</Button>
		</div>
	);
}
