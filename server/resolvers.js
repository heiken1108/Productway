const ProductModel = require("./models/products");
const RatingModel = require("./models/ratings");

const resolvers = {
    Query: {
        //Implementation of GraphQL-query to find all products in the MongoDB-database
        getAllProducts: async (_, {sortOrder}) => {
            if (sortOrder === 1){
                return await ProductModel.find().sort({currentPrice: 1});
            } else if (sortOrder === -1){
                return await ProductModel.find().sort({currentPrice: -1});
            } else {
                return await ProductModel.find();
            }
        },
        getProductsWithLimit: async (_, { limit, page }) => {
            const products = await ProductModel.find().limit(limit).skip((page - 1) * limit);
            return products;
        },
        //Implementation of GraphQL-query to find a product by its productID in the MongoDB-database
        getProductByProductID: async (_, { productID }) => {
            return await ProductModel.findOne({ productID });
        },
        //Implementation of GraphQL-query to find all products in the MongoDB-database with a specific category
        getProductsByCategory: async (parent, { category }) => {
            if (sortOrder === 1){
                return await ProductModel.find({ category: category }).sort({currentPrice: 1});
            } else if (sortOrder === -1){
                return await ProductModel.find({ category: category }).sort({currentPrice: -1});
            } else {
                return await ProductModel.find({ category: category });
            }
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
        getProductsByFilters: async (parent, { name, categories, minPrice, maxPrice, sortOrder }) => {
            const filters = {};
            if (name) {
                const regex = new RegExp(name, 'i');
                filters.name = { $regex: regex } ;
            }
            if (categories && categories.length > 0) {
                filters.category = { $in: categories };
            }
            if (minPrice !== undefined) {
                filters.currentPrice = {$gte: minPrice};
            }
            if (maxPrice !== undefined) {
                filters.currentPrice = {...filters.currentPrice, $lte: maxPrice};
            }
            let producs;
            if (sortOrder === 1) {
                producs = await ProductModel.find(filters).sort({ currentPrice: 1 }); // Stigende rekkefølge
            } else if (sortOrder === -1) {
                producs = await ProductModel.find(filters).sort({ currentPrice: -1 }); // Synkende rekkefølge
            } else {
                producs = await ProductModel.find(filters); // Ingen spesifisert rekkefølge, returner som det er
            }
            return producs;
        },
        getProductsByFiltersWithLimit: async (parent, { name, categories, minPrice, maxPrice, limit, page, sortOrder }) => {
            const filters = {};
            if (name) {
                const regex = new RegExp(name, 'i');
                filters.name = { $regex: regex } ;
            }
            if (categories && categories.length > 0) {
                filters.category = { $in: categories };
            }
            if (minPrice !== undefined) {
                filters.currentPrice = {$gte: minPrice};
            }
            if (maxPrice !== undefined) {
                filters.currentPrice = {...filters.currentPrice, $lte: maxPrice};
            }
            let products;
            if (sortOrder === 1) {
                products = await ProductModel.find(filters).sort({ currentPrice: 1 }).limit(limit).skip((page - 1) * limit); // Stigende rekkefølge
            } else if (sortOrder === -1) {
                products = await ProductModel.find(filters).sort({ currentPrice: -1 }).limit(limit).skip((page - 1) * limit); // Synkende rekkefølge
            } else {
                products = await ProductModel.find(filters).limit(limit).skip((page - 1) * limit); // Ingen spesifisert rekkefølge, returner som det er
            }
            return products;
        },
        getCountProductsByFilters: async (parent, { name, categories, minPrice, maxPrice }) => {
            const filters = {};
            if (name) {
                const regex = new RegExp(name, 'i');
                filters.name = { $regex: regex } ;
            }
            if (categories && categories.length > 0) {
                filters.category = { $in: categories };
            }
            if (minPrice !== undefined) {
                filters.currentPrice = {$gte: minPrice};
            }
            if (maxPrice !== undefined) {
                filters.currentPrice = {...filters.currentPrice, $lte: maxPrice};
            }
            const count = await ProductModel.count(filters);
            return count
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
