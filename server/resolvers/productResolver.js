import ProductModel from "../models/Products.js";

const productResolver = {
    Query: {
        getRandomItem: async () => {
            const count = await ProductModel.count();
            const random = Math.floor(Math.random() * count);
            return await ProductModel.findOne().skip(random);
        },
        getProductByProductID: async (_, { productID }) => {
            return await ProductModel.findOne({ productID });
        },

        getProductsBySearch: async (parent, { search }) => {
            const regex = new RegExp(search, 'i');
            return await ProductModel.aggregate([
                {
                    $match: { name: { $regex: regex } }
                },
                {
                    $group: {
                        _id: "$name",
                        firstProduct: { $first: "$$ROOT" },
                    }
                },
                {
                    $replaceRoot: { newRoot: "$firstProduct" }
                }
            ]);
        },

        getProductsByFilters: async (parent, { name, categories, minPrice, maxPrice, sortOrder }) => {
            const filters = {};
            if (name) {
                const regex = new RegExp(name, 'i');
                filters.name = { $regex: regex };
            }
            if (categories && categories.length > 0) {
                filters.category = { $in: categories };
            }
            if (minPrice !== undefined) {
                filters.currentPrice = { $gte: minPrice };
            }
            if (maxPrice !== undefined) {
                filters.currentPrice = { ...filters.currentPrice, $lte: maxPrice };
            }
            let products;
            if (sortOrder === 1) {
                products = await ProductModel.find(filters).sort({ currentPrice: 1 }); // Stigende rekkefølge
            } else if (sortOrder === -1) {
                products = await ProductModel.find(filters).sort({ currentPrice: -1 }); // Synkende rekkefølge
            } else {
                products = await ProductModel.find(filters); // Ingen spesifisert rekkefølge, returner som det er
            }
            return producs;
        },

        getProductsByFiltersWithLimit: async (parent, { searchTerm, categories, minPrice, maxPrice, limit, page, sortOrder }) => {
            const filters = {};
            if (searchTerm) {
                const regex = new RegExp(searchTerm, 'i');
                filters.name = { $regex: regex };
            }
            if (categories && categories.length > 0) {
                filters.category = { $in: categories };
            }
            if (minPrice !== undefined) {
                filters.currentPrice = { $gte: minPrice };
            }
            if (maxPrice !== undefined) {
                filters.currentPrice = { ...filters.currentPrice, $lte: maxPrice };
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

        getCountProductsByFilters: async (parent, { searchTerm, categories, minPrice, maxPrice }) => {
            const filters = {};
            if (searchTerm) {
                const regex = new RegExp(searchTerm, 'i');
                filters.name = { $regex: regex };
            }
            if (categories && categories.length > 0) {
                filters.category = { $in: categories };
            }
            if (minPrice !== undefined) {
                filters.currentPrice = { $gte: minPrice };
            }
            if (maxPrice !== undefined) {
                filters.currentPrice = { ...filters.currentPrice, $lte: maxPrice };
            }
            const count = await ProductModel.count(filters);
            return count;
        },

        getAverageProductRating: async (_, { productID }) => {
            try {
                const ratings = await RatingModel.find({ productID: productID });
                if (ratings.length === 0) {
                    return 0;
                }
                const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0);
                const average = sum / ratings.length;
                return parseFloat(average.toFixed(2));
            } catch (error) {
                return 0;
            }
        }
    }
};

export default productResolver;
