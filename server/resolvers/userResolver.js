import UserModel from '../models/User.js';
import ProductModel from '../models/Products.js';

const userResolver = {
	Query: {
		/**
		 *  Function to get all favorites for a user
		 * @param {*} userID the id of the user that gets its favorites
		 * @returns the favorites of the user
		 */
		getFavoritesByUserID: async (_, { userID }) => {
			try {
				const user = await UserModel.findOne({
					userID: userID,
				}).populate('favorites');

				if (!user) {
					throw new Error('User not found');
				}

				return user.favorites; // Returnerer alle favoritter for brukeren
			} catch (error) {
				throw new Error(
					`Failed to get user favorites: ${error.message}`,
				);
			}
		},

		getRatingsByUserID: async (_, { userID }) => {
			try {
				const user = await UserModel.findOne({
					userID: userID,
				}).populate('ratings');
				if (!user) {
					throw new Error('User not found');
				}

				return user.ratings;
			} catch (error) {
				throw new Error(`Failed to get user ratings: ${error.message}`);
			}
		},
	},
	Mutation: {
		/**
		 * Function to add a user to the database
		 * @param {*} userID the id of the user to be added
		 * @returns
		 */
		addUser: async (_, { userID }) => {
			const user = new UserModel({ userID, favorites: [], ratings: [] });
			return await user.save();
		},

		/**
		 * Function to add a product to a users favorites
		 * @param {*} userID the id of the user to be deleted
		 * @returns a the user that added the product as favorite
		 */
		addFavorite: async (_, { userID, productID }) => {
			try {
				const user = await UserModel.findOne({ userID: userID });
				if (!user) {
					throw new Error('User not found');
				}
				const product = await ProductModel.findOne({
					productID: productID,
				});
				if (!product) {
					throw new Error('Product not found');
				}
				user.favorites.push(product);
				await user.save();
				return user;
			} catch (error) {
				throw new Error(`Failed to add favorite: ${error.message}`);
			}
		},
		/**
		 * Function to remove a product from a users favorites
		 * @param {*} userID
		 * @param {*} productID the id of the product to be removed
		 * @returns the user that removed the product from favorites
		 */

		removeFavorite: async (_, { userID, productID }) => {
			try {
				const user = await UserModel.findOne({ userID: userID });
				if (!user) {
					throw new Error('User not found');
				}
				const product = await ProductModel.findOne({
					productID: productID,
				});
				if (!product) {
					throw new Error('Product not found');
				}
				const index = user.favorites.indexOf(product._id);
				if (index === -1) {
					throw new Error('Product is not in favorites');
				}
				user.favorites.splice(index, 1);
				await user.save();
				return user;
			} catch (error) {
				throw new Error(`Failed to remove favorite: ${error.message}`);
			}
		},
	},
};

export default userResolver;
