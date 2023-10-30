import { gql } from '@apollo/client';

/*
 * Query to get all products from the database
 */
export const GET_DATA = gql`
	query Query($sortOrder: Int) {
		getAllProducts(sortOrder: $sortOrder) {
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

export const GET_DATA_WITH_LIMIT = gql`
	query GetProductsWithLimit($limit: Int!, $page: Int!) {
		getProductsWithLimit(limit: $limit, page: $page) {
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
 * Query to get all products from the database of a specific category
 */
export const GET_PRODUCTS_BY_CATEGORY = gql`
	query GetProductsByCategory($category: String!, $sortOrder: Int) {
		getProductsByCategory(category: $category, sortOrder: $sortOrder) {
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
 * Mutation to add a rating a product in the database, using its ProductID to identify it
 */
export const SET_RATING_BY_PRODUCT_ID = gql`
	mutation AddRating($rating: Int!, $productID: Int!, $userID: String!) {
		addRating(
			ratingInput: {
				rating: $rating
				productID: $productID
				userID: $userID
			}
		) {
			_id
			productID
			rating
			userID
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
export const GET_PRODUCT_BY_FILTERS = gql`
	query GetProductsByFilters(
		$search: String
		$categories: [String]
		$minPrice: Float
		$maxPrice: Float
		$sortOrder: Int
	) {
		getProductsByFilters(
			name: $search
			categories: $categories
			minPrice: $minPrice
			maxPrice: $maxPrice
			sortOrder: $sortOrder
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

export const GET_PRODUCT_BY_FILTERS_WITH_LIMIT = gql`
	query getProductsByFiltersWithLimit(
		$search: String
		$categories: [String]
		$minPrice: Float
		$maxPrice: Float
		$sortOrder: Int
		$limit: Int!
		$page: Int!
	) {
		getProductsByFiltersWithLimit(
			name: $search
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

export const GET_COUNT_PRODUCTS_BY_FILTERS = gql`
	query Query(
		$name: String
		$categories: [String]
		$minPrice: Float
		$maxPrice: Float
	) {
		getCountProductsByFilters(
			name: $name
			categories: $categories
			minPrice: $minPrice
			maxPrice: $maxPrice
		)
	}
`;
/*
 * Mutation to update the rating of a product in the database, using its ProductID and the users UserID  to identify the specific rating-record
 */
export const UPDATE_RATING_BY_PRODUCT_ID_AND_USERID = gql`
	mutation UpdateRating($rating: Int!, $productID: Int!, $userID: String!) {
		updateRating(
			ratingInput: {
				rating: $rating
				productID: $productID
				userID: $userID
			}
		) {
			_id
			productID
			rating
			userID
		}
	}
`;
