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
    }
};

export default productResolver;
