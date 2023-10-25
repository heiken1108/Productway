const ProductModel = require("./models/products");
const RatingModel = require("./models/ratings");

const resolvers = {
    Query: {
        //Implementation of GraphQL-query to find all products in the MongoDB-database
        getAllProducts: async () => {
            const products = await ProductModel.find();
            return products;
        },
        //Implementation of GraphQL-query to find a product by its productID in the MongoDB-database
        getProductByProductID: async (_, { productID }) => {
            return await ProductModel.findOne({ productID });
        },
        //Implementation of GraphQL-query to find all products in the MongoDB-database with a specific category
        getProductsByCategory: async (parent, { category }) => {
            return await ProductModel.find({ category: category });
        },
        //Implementation of GraphQL-query to find all products in the MongoDB-database that matches a specific search term
        getProductsBySearch: async (parent, { search }) => {
            const regex = new RegExp(search, 'i');
            return await ProductModel.aggregate([
                {
                    $match: {name: {$regex: regex} }
                },
                {
                    $group: {
                        _id: "$name",
                        firstProduct: {$first: "$$ROOT"},
                    }
                },
                {
                    $replaceRoot: {newRoot: "$firstProduct"}
                }
            ]);
        },
        //Implementation of GraphQL-query to find all products in the MongoDB-database with a price between a minimum and maximum price
        getProductsByPriceRange: async (parent, { minPrice, maxPrice }) => {
            return await ProductModel.find({ currentPrice: { $gte: minPrice, $lte: maxPrice } });
        },
        //Implementation of GraphQL-query to find all products in the MongoDB-database that matches a specific search term, category and price range
        getProductsByFilters: async (parent, { name, category, minPrice, maxPrice }) => {
            const filters = {};
            if (name) {
                const regex = new RegExp(name, 'i');
                filters.name = { $regex: regex } ;
            }
            if (category) {
                filters.category = category;
            }
            if (minPrice !== undefined) {
                filters.currentPrice = {$gte: minPrice};
            }
            if (maxPrice !== undefined) {
                filters.currentPrice = {...filters.currentPrice, $lte: maxPrice};
            }
            return await ProductModel.find(filters);
        },
        //Implementation of GraphQL-query to find all ratings in the MongoDB-database
        getRatings: async () => {
            return RatingModel.find();
        },
        //Implementation of GraphQL-query to find all ratings in the MongoDB-database for a specific product, identifying it by its productID
        getRatingsByProductID: async (_, { productID }) => {
            return await RatingModel.find({ productID: productID });
        },
    },
    Mutation: {
        //Implementation of GraphQL-mutation to add a rating to the MongoDB-database, using productID to identify it
        addRating: async(_, {ratingInput}) => {
            const {rating, productID, userID} = ratingInput;
            const ratingProduct = new RatingModel({rating: rating, productID: productID, userID: userID});
            await ratingProduct.save();
            return ratingProduct;
        },
        //Implementation of GraphQL-mutation to update a rating in the MongoDB-database, using productID and userID to identify it
        updateRating: async(_, {ratingInput}) => {
            const {rating, productID, userID} = ratingInput;
            const ratingProduct = await RatingModel.findOneAndUpdate({productID: productID, userID: userID}, {rating: rating});
            return ratingProduct;
        }
    }
};

module.exports = resolvers;
