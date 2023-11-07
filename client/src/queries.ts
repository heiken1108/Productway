import { gql } from '@apollo/client';

/*
 * Query to get a single products from the database, using ProductID to identify it
 */
export const GET_PRODUCT_BY_PRODUCT_ID = gql`
	query GetProductByProductID($productID: Int!) {
		getProductByProductID(productID: $productID) {
			_id
			productID
			name
			brand
			ean
			image
			category
			description
			currentPrice
			weight
			weightUnit
			store
		}
	}
`;

/*
 * Query to get all products that matches a specific search term
 */
export const GET_PRODUCTS_BY_SEARCHTERM = gql`
	query GetProductsBySearch($search: String!) {
		getProductsBySearch(search: $search) {
			brand
			category
			currentPrice
			description
			ean
			image
			name
			productID
			store
			weight
			weightUnit
		}
	}
`;

/*
 * Query to get all products that matches a collection of filters, including search term, category, and a price range
 */

export const GET_PRODUCT_BY_FILTERS_WITH_LIMIT = gql`
	query getProductsByFiltersWithLimit(
		$searchTerm: String
		$categories: [String]
		$minPrice: Float
		$maxPrice: Float
		$sortOrder: Int
		$limit: Int!
		$page: Int!
	) {
		getProductsByFiltersWithLimit(
			searchTerm: $searchTerm
			categories: $categories
			minPrice: $minPrice
			maxPrice: $maxPrice
			sortOrder: $sortOrder
			limit: $limit
			page: $page
		) {
			brand
			currentPrice
			category
			description
			ean
			image
			name
			productID
			store
			weight
			weightUnit
		}
	}
`;
/*
 * query to get the number of productions that matches the filter
 */
export const GET_COUNT_PRODUCTS_BY_FILTERS = gql`
	query Query(
		$searchTerm: String
		$categories: [String]
		$minPrice: Float
		$maxPrice: Float
	) {
		getCountProductsByFilters(
			searchTerm: $searchTerm
			categories: $categories
			minPrice: $minPrice
			maxPrice: $maxPrice
		)
	}
`;

/*
 * Query to get a single user from the database, using userID to identify it
 */
export const GET_USER_BY_USERID = gql`
	query Query($userID: String!) {
		getUserByID(userID: $userID) {
			_id
			userID
			favorites {
				_id
				productID
				name
				brand
				ean
				image
				category
				description
				currentPrice
				weight
				weightUnit
				store
			}
		}
	}
`;
/*
 * Query to get all ratings from the database, using userID to identify it
 */
export const GET_RATINGS_BY_USER_ID = gql`
	query Query($userID: String!) {
		getRatingsByUserID(userID: $userID) {
			_id
			userID
			rating
			productID
		}
	}
`;
/*
 * Query to get a single rating from the database, using ProductID and UserID to identify it
 */
export const GET_RATING_BY_PRODUCT_ID_AND_USER_ID = gql`
	query Query($userID: String!, $productID: Int!) {
		getRatingByProductIDandUserID(userID: $userID, productID: $productID) {
			_id
			userID
			rating
			productID
		}
	}
`;

/*
 * Query to get all products that the user has added as favorite
 */
export const GET_FAVORITES_BY_USER_ID = gql`
	query Query($userID: String!) {
		getFavoritesByUserID(userID: $userID) {
			_id
			productID
			name
			brand
			ean
			image
			category
			description
			currentPrice
			weight
			weightUnit
			store
		}
	}
`;
/*
 * Mutation to add a user to the database
 */
export const ADD_USER = gql`
	mutation Mutation($userID: String!) {
		addUser(userID: $userID) {
			_id
			userID
			favorites {
				brand
				_id
				category
				currentPrice
				description
				ean
				image
				name
				productID
				store
				weight
				weightUnit
			}
			ratings {
				_id
				productID
				rating
				userID
			}
		}
	}
`;
/*
 * Mutation to add a rating to a product, used to both post and put a rating
 */

export const ADD_RATING = gql`
	mutation Mutation($userID: String!, $productID: Int!, $rating: Int!) {
		addRating(userID: $userID, productID: $productID, rating: $rating) {
			_id
			userID
			favorites {
				_id
			}
			ratings {
				_id
				productID
				rating
			}
		}
	}
`;
/*
 * Mutation to remove a rating from a product
 */
export const REMOVE_RATING = gql`
	mutation Mutation($userID: String!, $productID: Int!) {
		removeRating(userID: $userID, productID: $productID) {
			_id
			userID
			ratings {
				_id
				productID
				rating
			}
		}
	}
`;

/*
 * Mutation to add a product as favorite
 */
export const ADD_FAVORITE = gql`
	mutation Mutation($userID: String!, $productID: Int!) {
		addFavorite(userID: $userID, productID: $productID) {
			_id
			userID
		}
	}
`;
/*
 * Mutation to remove a product as favorite
 */
export const REMOVE_FAVORITE = gql`
	mutation Mutation($userID: String!, $productID: Int!) {
		removeFavorite(userID: $userID, productID: $productID) {
			_id
			userID
		}
	}
`;
