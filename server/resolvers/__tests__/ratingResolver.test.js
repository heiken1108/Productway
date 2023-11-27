import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {
	afterAll,
	afterEach,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
} from 'vitest';

import RatingModel from '../../models/Ratings.js';
import UserModel from '../../models/User.js';
import ratingResolver from '../ratingResolver.js';

const { Query: ratingQuery, Mutation: ratingMutation } = ratingResolver;

let mockServer;

async function createRatings(products) {
	await RatingModel.create(products);
}
/**
 * Connect to the in-memory database.
 */
beforeAll(async () => {
	mockServer = await MongoMemoryServer.create();
	const uri = mockServer.getUri();
	await mongoose.connect(uri);
});
/**
 * Clear all test data after every test.
 */
afterEach(async () => {
	await RatingModel.deleteMany({});
});
/**
 * Disconnect and close the db and server.
 */
afterAll(async () => {
	await mongoose.disconnect();
	await mockServer.stop();
});

/**
 * Create a test user before each test
 */
beforeEach(async () => {
	const testUser = {
		userID: 'user456',
		favorites: [],
		ratings: [],
	};

	await UserModel.create(testUser);
});

const mockRatings = [
	{
		productID: 1,
		rating: 4.5,
		userID: 'user123',
	},
	{
		productID: 2,
		rating: 3.8,
		userID: 'user456',
	},
	{
		productID: 1,
		rating: 5.0,
		userID: 'user789',
	},
	{
		productID: 3,
		rating: 4.0,
		userID: 'user123',
	},
	{
		productID: 2,
		rating: 2.5,
		userID: 'user789',
	},
];

describe('RatingResolver', () => {
	describe('RatingQuery', () => {
		describe('getRatingByProductIDandUserID', () => {
			it('Should return rating based on ProductID and UserID', async () => {
				await createRatings(mockRatings);

				const result = await ratingQuery.getRatingByProductIDandUserID(
					null,
					{ productID: 1, userID: 'user123' },
				);

				const isRating = mockRatings.some(
					mockRatings => mockRatings.rating === result.rating,
				);
				expect(isRating).toBe(true);
			});
		});

		describe('getAverageProductRating', () => {
			it('Should return average rating based on ProductID', async () => {
				await createRatings(mockRatings);
				const result = await ratingQuery.getAverageProductRating(null, {
					productID: 1,
				});

				expect(result).toBe(4.75);
			});
		});
	});

	describe('RatingMutation', async () => {
		describe('addRating', () => {
			it('Should add a new rating', async () => {
				const newRating = {
					productID: 4,
					rating: 4.2,
					userID: 'user456',
				};

				const result = await ratingMutation.addRating(null, newRating);
				const addedRating = await RatingModel.findOne({
					productID: newRating.productID,
					userID: newRating.userID,
				});

				expect(addedRating.rating).toBe(newRating.rating);
			});

			it('Should update an existing rating', async () => {
				const existingRating = {
					productID: 4,
					rating: 4.5,
					userID: 'user456',
				};

				await RatingModel.create(existingRating);

				const result2 = await ratingMutation.addRating(
					null,
					existingRating,
				);

				const updatedRatingInDB = await RatingModel.findOne({
					productID: existingRating.productID,
					userID: existingRating.userID,
				});

				expect(updatedRatingInDB.rating).toBe(existingRating.rating);
			});
		});

		describe('removeRating', () => {
			it('Should remove a rating based on ProductID and UserID', async () => {
				const rating = {
					productID: 2,
					rating: 3.8,
					userID: 'user456',
				};
				const createdRating = await RatingModel.create(rating);

				await UserModel.updateOne(
					{ userID: 'user456' },
					{ $push: { ratings: createdRating._id } },
				);

				const result = await ratingQuery.getRatingByProductIDandUserID(
					null,
					{ productID: 2, userID: 'user456' },
				);
				const result2 = await ratingMutation.removeRating(null, {
					productID: 2,
					userID: 'user456',
				});
				const result3 = await ratingQuery.getRatingByProductIDandUserID(
					null,
					{ productID: 2, userID: 'user456' },
				);
				expect(result3).toBe(null);
			});
		});
	});
});
