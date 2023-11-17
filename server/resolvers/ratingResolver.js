const RatingModel = require("../models/Ratings");
const UserModel = require("../models/User");

const ratingResolver = {
    Query: {
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
        },

        getRatingsByUserID: async (_, { userID }) => {
            try {
                const user = await UserModel.findOne({ userID: userID }).populate('ratings');
                if (!user) {
                  throw new Error('User not found');
                }
                
                return user.ratings;
            } catch (error) {
                throw new Error(`Failed to get user ratings: ${error.message}`);
            }
        }
    },
    Mutation: {
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
    }
}

module.exports = ratingResolver;