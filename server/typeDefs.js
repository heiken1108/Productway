import { gql } from 'apollo-server-express';
/**
 * Type definitions to define the schemas and operations that can be performed on the data, including both queries and mutations
 */
const typeDefs = gql`
    type ProductModel {
        _id: ID
        productID: Int
        name: String
        brand: String
        ean: String
        image: String
        category: String
        description: String
        currentPrice: Float
        weight: Float
        weightUnit: String
        store: String
    }

    type RatingModel {
        _id: ID
        productID: Int!
        rating: Int!
        userID: String!
    }

    input RatingInput {
        rating: Int!
        productID: Int!
        userID: String!
    }

    type UserModel {
        _id: ID
        userID: String!
        favorites: [ProductModel]
        ratings: [RatingModel]
    }

    type Query {
        getRandomItem: ProductModel
        getProductByProductID(productID: Int!): ProductModel
        getProductsBySearch(search: String!): [ProductModel]
        getProductsByFilters(name: String, categories: [String], minPrice: Float, maxPrice: Float, sortOrder: Int): [ProductModel]
        getProductsByFiltersWithLimit(searchTerm: String, categories: [String], minPrice: Float, maxPrice: Float, limit: Int!, page: Int!, sortOrder: Int): [ProductModel]
        getCountProductsByFilters(searchTerm: String, categories: [String], minPrice: Float, maxPrice: Float): Int
        getRatingsByUserID(userID: String!): [RatingModel]
        getFavoritesByUserID(userID: String!): [ProductModel]
        getRatingByProductIDandUserID(productID: Int!, userID: String!): RatingModel
        getAverageProductRating(productID: Int!): Float
    }

    type Mutation {
        addUser(userID: String!): UserModel
        addFavorite(userID: String!, productID: Int!): UserModel
        removeFavorite(userID: String!, productID: Int!): UserModel
        addRating(rating: Int!, productID: Int!, userID: String!): UserModel 
        removeRating(productID: Int!, userID: String!): UserModel   
    }
`;

export default typeDefs;
