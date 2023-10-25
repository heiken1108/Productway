import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React from 'react';
import { Button } from '@mui/base';

/*
 * Alert component from MUI, used with Snackbar.
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
	function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	},
);

/*
 * This component is a button that adds an item to the favourite list.
 */
export default function AddToFavourite({ id }: { id: number }) {
	const [addedToFavourite, setAddedToFavourite] = useState(false);

	/*
	 * This function adds the item to the favourite list in the local storage.
	 */
	function handleAddToFavourite() {
		setAddedToFavourite(true);
		if (localStorage.getItem('myFavourite') === null) {
			localStorage.setItem('myFavourite', id.toString());
		} else {
			localStorage.setItem(
				'myFavourite',
				localStorage.getItem('myFavourite') + ',' + id.toString(),
			);
			console.log(
				localStorage.getItem('myFavourite') + ',' + id.toString(),
			);
		}
	}
	/*
	 * This function closes the snackbar after autoHideDuration.
	 */
	const handleClose = () => {
		setAddedToFavourite(false);
	};

	return (
		<div className="addToFavourite">
			<div>
				<Button onClick={handleAddToFavourite}>
					Legg til som favoritt
				</Button>
			</div>
			<Snackbar
				open={addedToFavourite}
				autoHideDuration={4000}
				onClose={handleClose}
			>
				<Alert
					onClose={handleClose}
					severity="success"
					sx={{ width: '100%' }}
				>
					Lagt til i handleliste!
				</Alert>
			</Snackbar>
		</div>
	);
}
