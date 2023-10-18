const ProductModel = require("./models/products");
const RatingModel = require("./models/ratings");

const resolvers = {
    Query: {
        hello: () => {
            return "Hello world";
        },
        getAllProducts: async () => {
            const products = await ProductModel.find();
            return products;
        },
        getProductByProductID: async (_, { productID }) => {
            return await ProductModel.findOne({ productID });
        },
        getProductsByCategory: async (parent, { category }) => {
            return await ProductModel.find({ category: category });
        },
        getProductsBySearch: async (parent, { search }) => {
            const regex = new RegExp(search, 'i');
            return await ProductModel.find({ name: { $regex: regex } });
        },
        getProductsByPriceRange: async (parent, { minPrice, maxPrice }) => {
            return await ProductModel.find({ currentPrice: { $gte: minPrice, $lte: maxPrice } });
        },
        getRatings: async () => {
            return RatingModel.find();
        },
        getRatingsByProductID: async (_, { productID }) => {
            return await RatingModel.find({ productID: productID });
        },
    },
    Mutation: {
        addRating: async(_, {ratingInput}) => {
            const {rating, productID, userID} = ratingInput;
            const ratingProduct = new RatingModel({rating: rating, productID: productID, userID: userID});
            await ratingProduct.save();
            return ratingProduct;
        }
    }
};

module.exports = resolvers;
