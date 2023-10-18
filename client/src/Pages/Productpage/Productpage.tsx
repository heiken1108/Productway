import './Productpage.css';
import {
	GET_PRODUCT_BY_PRODUCT_ID,
	SET_RATING_BY_PRODUCT_ID,
} from '../../queries';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import React from 'react';

/*
 * Styling for the rating icons
 */
const StyledRating = styled(Rating)(({ theme }) => ({
	'& .MuiRating-iconEmpty .MuiSvgIcon-root': {
		color: theme.palette.action.disabled,
	},
}));

/*
 * Icons for the rating
 */
const customIcons: {
	[index: string]: {
		icon: React.ReactElement;
		label: string;
	};
} = {
	1: {
		icon: <SentimentVeryDissatisfiedIcon color="error" fontSize="large" />,
		label: 'Very Dissatisfied',
	},
	2: {
		icon: <SentimentDissatisfiedIcon color="error" fontSize="large" />,
		label: 'Dissatisfied',
	},
	3: {
		icon: <SentimentSatisfiedIcon color="warning" fontSize="large" />,
		label: 'Neutral',
	},
	4: {
		icon: <SentimentSatisfiedAltIcon color="success" fontSize="large" />,
		label: 'Satisfied',
	},
	5: {
		icon: <SentimentVerySatisfiedIcon color="success" fontSize="large" />,
		label: 'Very Satisfied',
	},
};
/*
 * function for displaying the rating icons
 */
function IconContainer(props: IconContainerProps) {
	const { value, ...other } = props;
	return <span {...other}>{customIcons[value].icon}</span>;
}

export default function Productpage() {
	const { id } = useParams();
	const userID = getOrSetUserID();
	const [mutateFunction] = useMutation(SET_RATING_BY_PRODUCT_ID);
	const { data, loading, error } = useQuery(GET_PRODUCT_BY_PRODUCT_ID, {
		variables: { productID: Number(id) },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	const postRating = (newRating: number) => {
		mutateFunction({
			variables: {
				productID: Number(data.getProductByProductID.productID),
				userID: Number(userID),
				rating: Number(newRating),
			},
		});
	};

	/*
	 * Function for setting the rating
	 */
	function setRating(rating: number) {
		const MyRatings = localStorage.getItem('MyRatings');

		let ratings: string[] = [];
		if (MyRatings !== null) {
			ratings = MyRatings.split(',');
		}

		let alreadyRated = false;
		for (let i = 0; i < ratings.length; i++) {
			const oldRating = ratings[i].split(':');
			if (oldRating[0] === id) {
				ratings.splice(i, 1);
				ratings.push(id + ':' + rating);
				alreadyRated = true;
				/*
				 * Api call to update the rating in the backend
				 * sender inn productID og rating.
				 */
			}
		}

		if (!alreadyRated) {
			ratings.push(id + ':' + rating);
			/*
			 * Api call to post the rating to the backend
			 */
			postRating(rating);
		}
		localStorage.setItem('MyRatings', ratings.join(','));
	}

	function getOrSetUserID() {
		const userID = localStorage.getItem('userID');
		if (userID === null) {
			const newUserID = Math.floor(Math.random() * 1000000000);
			localStorage.setItem('userID', newUserID.toString());
			return newUserID;
		}
		return userID;
	}

	/*
	 * Function for handling the rating change
	 */
	const handleRatingChange = (
		_event: React.SyntheticEvent<Element, Event>,
		newValue: number | null,
	) => {
		if (newValue !== null) {
			setRating(newValue);
		}
	};

	return (
		<div className="productContainer">
			<div className="productContent">
				<div className="productImage">
					<img
						src={data.getProductByProductID.image}
						alt="Image not found"
					/>
				</div>
				<div className="productInfo">
					<h1>{data.getProductByProductID.name}</h1>
					<h4>{'Merke: ' + data.getProductByProductID.brand}</h4>
					<p>{data.getProductByProductID.description}</p>
					<p>
						{'Pris: kr ' +
							data.getProductByProductID.currentPrice +
							',-'}
					</p>
					<StyledRating
						name="highlight-selected-only"
						defaultValue={0}
						IconContainerComponent={IconContainer}
						getLabelText={(value: number) =>
							customIcons[value].label
						}
						highlightSelectedOnly
						onChange={handleRatingChange}
					/>
				</div>
			</div>
			<div>
				{/* <h1>Kategorier</h1> */}
				{/* <CategoryCard />  Kortet finnes ikke enda...*/}
			</div>
			<div>
				{/* <h1>Lignende produkter</h1> */}
				{/* <ProductCard /> Kortet finnes ikke enda... */}
			</div>
		</div>
	);
}
