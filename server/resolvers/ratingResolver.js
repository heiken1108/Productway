import RatingModel from "../models/Ratings.js";
import UserModel from "../models/User.js";

const ratingResolver = {
    Query: {
        /**
         * Finds the rating for a product by a user
         * @param {*} productID the id of the product to get ratings for
         * @param {*} userID the id of the user to get ratings for
         * @returns 
         */
        getRatingByProductIDandUserID: async (_, { productID, userID }) => {
            try {
                const rating = await RatingModel.findOne({ productID: productID, userID: userID });
                return rating;
            } catch (error) {
                throw new Error(`Failed to get rating: ${error.message}`);
            }
        },
        /**
         * Finds the average rating for a product
         * @param {*} productID the id of the product to get ratings for 
         * @returns the average rating for the product
         */
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
        /**
         * Function to get all ratings for a user
         * @param {*} userID the id of the user to get ratings for 
         * @returns the ratings for the user
         */

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
        /**
         * Function to rate a product
         * @param {*} rating of a product
         * @param {*} productID the id of the product to be rated
         * @param {*} userID the id of the user that rates the product 
         * @returns user, rating and userID
         */
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
        /**
         * Function to remove a rating
         * @param {*} productID the id of the product to be removed
         * @param {*} userID the id of the user that removes the rating 
         * @returns the removed rating
         */
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

                console.log(rating._id)
                const indexOfRating = user.ratings.indexOf(rating._id);
                if (indexOfRating === -1) {
                    throw new Error("Rating is not in ratings");
                }
                user.ratings.splice(indexOfRating, 1);
                await user.save();
                await RatingModel.deleteOne({ productID: productID, userID: userID });
                return rating;
            } catch (error) {
                console.log(error)
                throw new Error(`Failed to remove rating: ${error.message}`);
            }
        },
    }
}

export default ratingResolver;
