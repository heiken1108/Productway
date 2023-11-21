import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import UserModel from "../../models/User.js";
import ProductModel from "../../models/Products.js";
import RatingModel from '../../models/Ratings.js';
import userResolver from '../userResolver.js';

const { Query: userQuery, Mutation: userMutation } = userResolver;

let mockServer;

async function createUser(users) {
    await UserModel.create(users);
}

beforeAll(async () => {
    mockServer = await MongoMemoryServer.create()
    const uri = mockServer.getUri();
    await mongoose.connect(uri);
})

afterEach(async () => {
    await UserModel.deleteMany({});
})

afterAll(async () => {
    await mongoose.disconnect()
    await mockServer.stop();
})

beforeEach(async () => {
    const mockProduct = {
        productID: 1,
        name: 'Test Product 1',
        brand: 'Test Brand',
        ean: '123456789',
        image: 'test_image_url',
        category: 'Test Category',
        description: 'Test Description',
        currentPrice: 10.99,
        weight: 500,
        weightUnit: 'g',
        store: 'Test Store',
    };

    const mockRating = {
        productID: 1,
        rating: 4.5,
        userID: 'user456',
    };

    const mockUser = {
        userID: 'user456',
        favorites: [],
        ratings: [],
    };

    const product = await ProductModel.create(mockProduct);
    const rating = await RatingModel.create(mockRating);

    await UserModel.create(mockUser);

    await UserModel.updateOne({ userID: 'user456' }, { $push: { ratings: rating._id } });
    await UserModel.updateOne({ userID: 'user456' }, { $push: { favorites: product._id } });
});

describe('UserResolver', () => {
    describe('UserQuery', () => {
        describe('getFavoritesByUserID', () => {
            it("Should get all favorites by userID", async () => {
                const result = await userQuery.getFavoritesByUserID(null, { userID: 'user456' });

                expect(result).toHaveLength(1);
                const resultP = result[0];
                const resultPName = resultP.name;
                expect(resultPName).toBe("Test Product 1");
            });
        });

        describe('getRatingsByUserID', () => {
            it("Should get all ratings by userID", async () => {
                const result = await userQuery.getRatingsByUserID(null, { userID: 'user456' });

                expect(result).toHaveLength(1);
                const resultR = result[0];
                const resultRName = resultR.rating;
                expect(resultRName).toBe(4.5);
            });
        });
    });

    describe('UserMutation', () => {
        describe('addUser', () => {
            it("Should add user", async () => {
                const userID = 'user455';

                const result = await userMutation.addUser(null, { userID });
                const savedUser = await UserModel.findOne({ userID });

                expect(savedUser).toBeDefined();
                expect(savedUser.userID).toBe(userID);
                expect(savedUser.favorites).toEqual([]);
                expect(savedUser.ratings).toEqual([]);
            });
        });

        describe('addFavorite', () => {
            it("Should add favorite to user", async () => {
                const mockProduct = {
                    productID: 2,
                    name: 'Test Product 2',
                    brand: 'Test Brand',
                    ean: '123456789',
                    image: 'test_image_url',
                    category: 'Test Category',
                    description: 'Test Description',
                    currentPrice: 10.99,
                    weight: 500,
                    weightUnit: 'g',
                    store: 'Test Store',
                };

                ProductModel.create(mockProduct);

                const result = await userMutation.addFavorite(null, { userID: 'user456', productID: 2 });
                expect(result).toBeDefined();
                expect(result.userID).toBe('user456');

                const updatedUser = await UserModel.findOne({ userID: 'user456' });

                expect(updatedUser).toBeDefined();
                expect(updatedUser.favorites).toHaveLength(2);
                expect(updatedUser.favorites[0].toString()).toBe(result.favorites[0].toString());
            });
        });
    });
});
