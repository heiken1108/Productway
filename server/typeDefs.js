const {gql} = require('apollo-server-express');

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
        userID: Int!
    }

    input RatingInput {
        rating: Int!
        productID: Int!
        userID: Int!
    }

    type Query {
        hello: String
        getAllProducts: [ProductModel]
        getProductByProductID(productID: Int!): ProductModel
        getProductsByCategory(category: String!): [ProductModel]
        getProductsBySearch(search: String!): [ProductModel]
        getProductsByPriceRange(minPrice: Float!, maxPrice: Float!): [ProductModel]
        getProductsByFilters(name: String, category: String, minPrice: Float, maxPrice: Float): [ProductModel]
        getRatings: [RatingModel]
        getRatingsByProductID(productID: Int!): [RatingModel]
    }

    type Mutation {
        addRating(ratingInput: RatingInput!): RatingModel
    }
`;

module.exports = typeDefs;
