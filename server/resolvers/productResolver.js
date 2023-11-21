import ProductModel from "../models/Products.js";

const productResolver = {
    Query: {
        /**
         * Function to find a random product
         * @returns a random product from the database
         */
        getRandomItem: async () => {
            const count = await ProductModel.count();
            const random = Math.floor(Math.random() * count);
            return await ProductModel.findOne().skip(random);
        },
        /**
         * Gets a product by its id
         * @param {*} productID the id of the product to get 
         * @returns the product
         */
        getProductByProductID: async (_, { productID }) => {
            return await ProductModel.findOne({ productID });
        },
        /**
         * Gets all products by a search term
         * @returns all products which fits the search term
         */
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
        /**
         * Function to get all products by filters with limit
         * @param {*} parent 
         * @param {*} Filters with Limit 
         * @returns all products that fits the filters with the given limits
         */
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
        /**
         * Function to get the count of products that fits the provided filters
         * @param {*} parent 
         * @param {*} Filters 
         * @returns the count of products that fits the filters
         */
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
