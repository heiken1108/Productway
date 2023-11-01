import { useEffect, useState } from 'react';

import FavouriteCard from '../FavouriteCard/FavouriteCard';

import './FavouriteContainer.css';

/*
 * This component is a container for the favourite cards.
 */
export default function FavouriteContainer() {
	const [ids, setIds] = useState<number[]>([]);
	/*
	 * This useEffect hook is used to get the favourite items from the local storage.
	 */
	useEffect(() => {
		const myFavourite = localStorage.getItem('myFavourite');
		if (myFavourite === null) {
			setIds([]);
		} else {
			setIds(myFavourite.split(',').map(Number));
		}
	}, []);

	return (
		<div className="FavouriteContainer">
			{ids.length === 0 ? (
				<h1>Favourite is empty</h1>
			) : (
				ids.map(id => <FavouriteCard key={id} id={id} />)
			)}
		</div>
	);
}
