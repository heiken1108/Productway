import FavouriteContainer from '../../Components/FavouriteContainer/FavouriteContainer';
import MyRatingsDisplay from '../../Components/MyRatingsDisplay/MyRatingsDisplay';

import './MyPage.css';
/*
 * Page for displaying user's favourite items and ratings
 */
export default function MyPage() {
	const userID = localStorage.getItem('userID') || '';
	return (
		<div className="MyPage">
			<div className="content-container">
				<div className="MyFavourites" aria-description="My Favorites">
					<h1>Mine favoritter</h1>
					<FavouriteContainer userID={userID} />
				</div>
				<div className="MyRatings" aria-description="My Ratings">
					<h1>Mine vurderinger</h1>
					<div className="ratingsContainer">
						<MyRatingsDisplay userID={userID || ''} />
					</div>
				</div>
			</div>
		</div>
	);
}
