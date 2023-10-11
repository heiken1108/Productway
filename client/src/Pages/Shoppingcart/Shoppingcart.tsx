import { useState, useEffect } from 'react';

export default function Shoppingcart() {
	const [shoppingcart, setShoppingcart] = useState<string[]>([]);

	useEffect(() => {
		const myShoppingcart = localStorage.getItem('myShoppingcart');
		if (myShoppingcart === null) {
			setShoppingcart([]);
		} else {
			setShoppingcart(myShoppingcart.split(','));
		}
	}, []); // Empty dependency array ensures this runs only on component mount

	return (
		<div>
			<h1> Page is still under construction! </h1>
			<h1>Shoppingcart</h1>
			{shoppingcart.length === 0 ? (
				<p>Shoppingcart is empty</p>
			) : (
				shoppingcart.map(item => <p key={item}> Item: {item}</p>)
			)}
		</div>
	);
}
