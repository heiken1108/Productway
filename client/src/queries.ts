import { gql } from '@apollo/client';

export const GET_DATA = gql`
	query Query {
		getAllProducts {
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

export const GET_PRODUCTS_BY_CATEGORY = gql`
	query GetProductsByCategory($category: String!) {
		getProductsByCategory(category: $category) {
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

export const SET_RATING_BY_PRODUCT_ID = gql`
	mutation AddRating($rating: Int!, $productID: Int!, $userID: Int!) {
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

export const GET_PRODUCT_BY_FILTERS = gql`
	query GetProductsByFilters(
		$search: String
		$category: String
		$minPrice: Float
		$maxPrice: Float
	) {
		getProductsByFilters(
			name: $search
			category: $category
			minPrice: $minPrice
			maxPrice: $maxPrice
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
