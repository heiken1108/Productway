const {gql} = require('apollo-server-express');

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

    type Query {
        hello: String
        getAllProducts: [ProductModel]
        getProductsWithLimit(limit: Int!, page: Int!): [ProductModel]
        getProductByProductID(productID: Int!): ProductModel
        getProductsByCategory(category: String!): [ProductModel]
        getProductsBySearch(search: String!): [ProductModel]
        getProductsByPriceRange(minPrice: Float!, maxPrice: Float!): [ProductModel]
        getProductsByFilters(name: String, categories: [String], minPrice: Float, maxPrice: Float, sortOrder: Int): [ProductModel]
        getProductsByFiltersWithLimit(searchTerm: String, categories: [String], minPrice: Float, maxPrice: Float, limit: Int!, page: Int!, sortOrder: Int): [ProductModel]
        getRatings: [RatingModel]
        getRatingsByProductID(productID: Int!): [RatingModel]
        getCountProductsByFilters(searchTerm: String, categories: [String], minPrice: Float, maxPrice: Float): Int    }

    type Mutation {
        addRating(ratingInput: RatingInput!): RatingModel
        updateRating(ratingInput: RatingInput!): RatingModel
    }
`;

module.exports = typeDefs;
