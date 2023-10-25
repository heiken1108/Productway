import FavouriteContainer from '../../Components/FavouriteContainer/FavouriteContainer';
import './MyPage.css';

/*
 * Page for displaying user's favourite items and ratings
 */
export default function MyPage() {
	return (
		<div className="MyPage">
			<h1>My page</h1>
			<div className="row-content">
				<div className="MyFavourites">
					<h1>My favorite items</h1>

					<FavouriteContainer />
				</div>
			</div>
			<div className="row-content">
				<div className="MyRatings">
					<h1>My ratings</h1>
				</div>
			</div>
		</div>
	);
}
