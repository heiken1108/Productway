const ProductModel = require("./models/products");

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
        }
    },
};

module.exports = resolvers;