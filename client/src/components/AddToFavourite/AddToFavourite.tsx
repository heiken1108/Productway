import React, { useEffect, useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Fab } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { IProduct } from '../../data/types';
import {
	ADD_FAVORITE,
	GET_FAVORITES_BY_USER_ID,
	REMOVE_FAVORITE,
} from '../../graphql/queries';

/*
 * Styling for MUI Alert
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/**
 * This component is to add or remove product from favorites
 * @param {number} productID - ID of product
 * @param {string} userID - ID of user
 */

export default function AddToFavourite({
	productID,
	userID,
}: {
	productID: number;
	userID: string;
}) {
	const [openAddedSnackbar, setOpenAddedSnackbar] = useState(false);
	const [removeSnackbar, setRemoveSnackbar] = useState(false);
	const [addedToFavourite, setAddedToFavourite] = useState(false);

	const [addFavoriteMutation] = useMutation(ADD_FAVORITE);
	const [removeFavoriteMutation] = useMutation(REMOVE_FAVORITE);

	const { data, refetch } = useQuery(GET_FAVORITES_BY_USER_ID, {
		variables: { userID: userID },
	});
	const favorites = data?.getFavoritesByUserID || [];
	const favoritesArray = favorites.map((item: IProduct) => {
		return item.productID;
	});
	/*
	 * useEffect to check if product is in favorites
	 */
	useEffect(() => {
		setAddedToFavourite(favoritesArray.includes(productID));
	}, [favoritesArray, productID]);
	/*
	 * Function to add or remove product from favorites
	 */
	async function handleAddToFavorite() {
		if (!addedToFavourite) {
			setOpenAddedSnackbar(true);
			await addFavoriteMutation({
				variables: {
					userID: userID,
					productID: productID,
				},
			});
		} else {
			await removeFavoriteMutation({
				variables: {
					userID: userID,
					productID: productID,
				},
			});
			setRemoveSnackbar(true);
		}
		refetch();
	}
	/*
	 * function to close snackbar
	 */
	const handleClose = () => {
		setOpenAddedSnackbar(false);
		setRemoveSnackbar(false);
	};

	return (
		<div className="addToFavourite">
			<div>
				<Box sx={{ '& > :not(style)': { m: 1 } }}>
					<Fab
						data-testid="favoriteIcon"
						aria-label="Like"
						style={{
							backgroundColor: addedToFavourite
								? '#287094'
								: 'grey',
							outline: 'none',
						}}
						onClick={handleAddToFavorite}
					>
						<FavoriteIcon
							style={{
								color: addedToFavourite ? 'red' : 'white',
							}}
						/>
					</Fab>
				</Box>
			</div>
			<Snackbar
				open={removeSnackbar}
				autoHideDuration={4000}
				onClose={handleClose}
			>
				<Alert
					onClose={handleClose}
					severity="error"
					sx={{ width: '100%' }}
				>
					Fjernet fra favoritter!
				</Alert>
			</Snackbar>
			<Snackbar
				open={openAddedSnackbar}
				autoHideDuration={4000}
				onClose={handleClose}
			>
				<Alert
					onClose={handleClose}
					severity="success"
					sx={{
						width: '100%',
						backgroundColor: '#00B894',
					}}
				>
					Lagt til i favoritter!
				</Alert>
			</Snackbar>
		</div>
	);
}
