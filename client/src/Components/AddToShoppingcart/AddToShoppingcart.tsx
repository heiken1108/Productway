import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function AddToShoppingcart({ id }: { id: number }) {
	function handleAddToShoppingcart() {
		if (localStorage.getItem('myShoppingcart') === null) {
			localStorage.setItem('myShoppingcart', id.toString());
		} else {
			localStorage.setItem(
				'myShoppingcart',
				localStorage.getItem('myShoppingcart') + ',' + id.toString(),
			);
			console.log(
				localStorage.getItem('myShoppingcart') + ',' + id.toString(),
			);
		}
	}

	return (
		<IconButton
			color="primary"
			aria-label="add to shopping cart"
			onClick={handleAddToShoppingcart}
		>
			<AddShoppingCartIcon />
		</IconButton>
	);
}
