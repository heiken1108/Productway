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
} from '../../queries';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

	useEffect(() => {
		setAddedToFavourite(favoritesArray.includes(productID));
	}, [favoritesArray, productID]);

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

	const handleClose = () => {
		setOpenAddedSnackbar(false);
		setRemoveSnackbar(false);
	};

	return (
		<div className="addToFavourite">
			<div>
				<Box sx={{ '& > :not(style)': { m: 1 } }}>
					<Fab
						aria-label="like"
						style={{
							backgroundColor: addedToFavourite
								? 'yellow'
								: 'grey',
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
