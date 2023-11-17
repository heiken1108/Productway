const UserModel = require("./models/User");
const ProductModel = require("./models/Products");
const RatingModel = require("./models/Ratings");

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
        getRandomItem: async () => {
            const count = await ProductModel.count();
            const random = Math.floor(Math.random() * count);
            return await ProductModel.findOne().skip(random);
        },
        getProductsWithLimit: async (_, { limit, page }) => {
            const products = await ProductModel.find().limit(limit).skip((page - 1) * limit);
            return products;
        },
        //Implementation of GraphQL-query to find a product by its productID in the MongoDB-database
        getProductByProductID: async (_, { productID }) => {
            return await ProductModel.findOne({ productID });
        },
        getProductByObjectID: async (_, { ObjectID }) => {
            try {
                // Use Mongoose's findById method to find the product by its _id
                const product = await ProductModel.findById(ObjectID);
        
                if (!product) {
                    throw new Error(`Product with _id ${ObjectID} not found`);
                }
                return product;
            } catch (error) {
                throw new Error(`Error fetching product: ${error.message}`);
            }
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
        getProductsByFiltersWithLimit: async (parent, { searchTerm, categories, minPrice, maxPrice, limit, page, sortOrder }) => {
            const filters = {};
            if (searchTerm) {
                const regex = new RegExp(searchTerm, 'i');
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
        getCountProductsByFilters: async (parent, { searchTerm, categories, minPrice, maxPrice }) => {
            const filters = {};
            if (searchTerm) {
                const regex = new RegExp(searchTerm, 'i');
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
        getRatingsByUserID: async (_, { userID }) => {
            //return await RatingModel.find({ userID: userID });
            try {
                const user = await UserModel.findOne({ userID: userID }).populate('ratings');
                if (!user) {
                  throw new Error('User not found');
                }
                
                return user.ratings; // Returnerer alle vurderinger for brukeren
            } catch (error) {
                throw new Error(`Failed to get user ratings: ${error.message}`);
            }
        },
        getUserByID: async (_, { userID }) => {
            return await UserModel.findOne({ userID }).populate("favorites");
        },
        getUsers: async () => {
            return UserModel.find().populate("favorites");
        },
        getFavoritesByUserID: async (_, { userID }) => {
            try {
                const user = await UserModel.findOne({ userID: userID }).populate('favorites');
            
                if (!user) {
                  throw new Error('User not found');
                }
            
                return user.favorites; // Returnerer alle favoritter for brukeren
            } catch (error) {
                throw new Error(`Failed to get user favorites: ${error.message}`);
            }
        },
        getRatingByProductIDandUserID: async (_, { productID, userID }) => {
            try {
                const rating = await RatingModel.findOne({ productID: productID, userID: userID });
                return rating;
            } catch (error) {
                throw new Error(`Failed to get rating: ${error.message}`);
            }
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
    },
    Mutation: {
        //Implementation of GraphQL-mutation to add a rating to the MongoDB-database, using productID to identify it
        addRating: async(_, {rating, productID, userID}) => {
            try {
                const user = await UserModel.findOne({ userID: userID });
                if (!user) {
                    throw new Error("User not found");
                }
                const existingRating = await RatingModel.findOne({productID, userID})
                if (existingRating && existingRating.userID == userID){
                    existingRating.rating = rating;
                    await existingRating.save();
                    return {user, existingRating, userID};
                } else {
                    const newRating = new RatingModel({userID, productID, rating})
                    await newRating.save()
                    user.ratings.push(newRating)
                    await user.save()
                    return {user, newRating, userID};
                }
            } catch (error) {
                throw new Error (`Failed to add rating: ${error.message}`)
            }
        },
        removeRating: async (_, { productID, userID }) => {
            try {
                const user = await UserModel.findOne({ userID: userID });
                if (!user) {
                    throw new Error("User not found");
                }
                const rating = await RatingModel.findOne({ productID: productID, userID: userID });
                if (!rating) {
                    throw new Error("Rating not found");
                }
                const indexOfRating = user.ratings.indexOf(rating._id);
                if (indexOfRating === -1) {
                    throw new Error("Rating is not in ratings");
                }
                user.ratings.splice(indexOfRating, 1);
                await user.save();
                await RatingModel.deleteOne({ productID: productID, userID: userID });
                return rating;
            } catch (error) {
                throw new Error(`Failed to remove rating: ${error.message}`);
            }
        },

        addUser: async (_, { userID }) => {
            const user = new UserModel({ userID, favorites: [], ratings: [] });
            return await user.save();
        },
        addFavorite: async (_, { userID, productID }) => {
            try {
                const user = await UserModel.findOne({ userID: userID });
                if (!user) {
                    throw new Error("User not found");
                }
                const product = await ProductModel.findOne({ productID: productID });
                if (!product) {
                    throw new Error("Product not found");
                }
                user.favorites.push(product);
                await user.save();
                return user;
            } catch (error) {
                throw new Error(`Failed to add favorite: ${error.message}`);
            }
        },
        removeFavorite: async (_, { userID, productID }) => {
            try {
                const user  = await UserModel.findOne({ userID: userID });
                if (!user) {
                    throw new Error("User not found");
                }
                const product = await ProductModel.findOne({ productID: productID });
                if (!product) {
                    throw new Error("Product not found");
                }
                const index = user.favorites.indexOf(product._id);
                if (index === -1) {
                    throw new Error("Product is not in favorites");
                }
                user.favorites.splice(index, 1);
                await user.save();
                return user;
            } catch (error) {
                throw new Error(`Failed to remove favorite: ${error.message}`);
            }


            // try {
            //     // Sjekk om brukeren eksisterer
            //     const user = await UserModel.findOne({ userID });
            
            //     if (!user) {
            //         throw new Error("Brukeren ble ikke funnet.");
            //     }
            
            //     // Finn indeksen til produktet i brukerens favoritter
            //     const index = user.favorites.indexOf(productObjectID);
            //     if (index === -1) {
            //         throw new Error("Produktet er ikke i brukerens favoritter.");
            //     }
            
            //     // Fjern produktet fra brukerens favoritter
            //     user.favorites.splice(index, 1);
            
            //     // Lagre endringene til brukeren
            //     await user.save();
            
            //     return user;
            //     } catch (error) {
            //     throw new Error(error.message);
            // }
        }
    }
};

module.exports = resolvers;
