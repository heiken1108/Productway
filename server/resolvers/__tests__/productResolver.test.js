import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import ProductModel from '../../models/Products.js';
import productResolver from '../productResolver.js';

const { Query: productQuery } = productResolver;

let mockServer;

async function createProducts(products) {
	await ProductModel.create(products);
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
	await ProductModel.deleteMany({});
});
/**
 * Remove and close the mock db and server.
 */
afterAll(async () => {
	await mongoose.disconnect();
	await mockServer.stop();
});

describe('ProductResolver', () => {
	describe('getRandomItem', () => {
		it('Should return the one product in the database', async () => {
			const testProduct = [
				{
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
				},
			];

			await createProducts(testProduct);

			const result = await productQuery.getRandomItem();

			expect(result).not.toBe(null);
			expect(result).toHaveProperty('productID');
			expect(result).toHaveProperty('name');
			expect(result).toHaveProperty('image');
			expect(result).toHaveProperty('description');
			expect(result).toHaveProperty('currentPrice');
			expect(result).toHaveProperty('store');
			expect(result).toHaveProperty('category');

			const isTestProduct = testProduct.some(
				testProduct => testProduct.name === result.name,
			);
			const isTestProductID = testProduct.some(
				testProduct => testProduct.productID === result.productID,
			);
			expect(isTestProduct).toBe(true);
			expect(isTestProductID).toBe(true);
		});
	});

	describe('getProductByProductID', () => {
		it('Should return products based on productID', async () => {
			const testProducts = [
				{
					productID: 1,
					name: 'Test Product 1',
					brand: 'Test Brand',
					ean: '123456788',
					image: 'test_image_url',
					category: 'Test Category',
					description: 'Test Description',
					currentPrice: 10.99,
					weight: 500,
					weightUnit: 'g',
					store: 'Test Store',
				},
				{
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
				},
			];

			await createProducts(testProducts);

			const result1 = await productQuery.getProductByProductID(null, {
				productID: 1,
			});
			const result2 = await productQuery.getProductByProductID(null, {
				productID: 2,
			});

			expect(result1).not.toBe(null);
			expect(result1).toHaveProperty('productID', 1);
			expect(result1).toHaveProperty('name', 'Test Product 1');

			expect(result2).not.toBe(null);
			expect(result2).toHaveProperty('productID', 2);
			expect(result2).toHaveProperty('name', 'Test Product 2');
		});
	});

	describe('getProductsBySearch', () => {
		it('Return products based on searchteerm', async () => {
			const testProducts = [
				{
					productID: 1,
					name: 'Brun saus',
					brand: 'Test Brand',
					ean: '123456788',
					image: 'test_image_url',
					category: 'Test Category',
					description: 'Test Description',
					currentPrice: 10.99,
					weight: 500,
					weightUnit: 'g',
					store: 'Test Store',
				},
				{
					productID: 2,
					name: 'Brune dadler',
					brand: 'Test Brand',
					ean: '123456789',
					image: 'test_image_url',
					category: 'Test Category',
					description: 'Test Description',
					currentPrice: 10.99,
					weight: 500,
					weightUnit: 'g',
					store: 'Test Store',
				},
			];

			await createProducts(testProducts);

			const result1 = await productQuery.getProductsBySearch(null, {
				search: 'Brun',
			});
			const result2 = await productQuery.getProductsBySearch(null, {
				search: 'Brune',
			});

			expect(result1).toHaveLength(2);
			expect(result2).toHaveLength(1);

			const result2Product = result2[0];
			const product2Name = result2Product.name;
			expect(product2Name).toBe('Brune dadler');
		});
	});

	describe('getProductsByFiltersWithLimit', () => {
		it('Should return products based on filters/categories', async () => {
			const testProducts = [
				{
					productID: 1,
					name: 'Test Product 1',
					brand: 'Test Brand',
					ean: '123456788',
					image: 'test_image_url',
					category: 'Test Category',
					description: 'Test Description',
					currentPrice: 10.99,
					weight: 500,
					weightUnit: 'g',
					store: 'Test Store',
				},
				{
					productID: 2,
					name: 'Test Product 2',
					brand: 'Test Brand',
					ean: '123456789',
					image: 'test_image_url',
					category: 'Test Category 2',
					description: 'Test Description',
					currentPrice: 10,
					weight: 500,
					weightUnit: 'g',
					store: 'Test Store',
				},
				{
					productID: 2,
					name: 'Test Product 2',
					brand: 'Test Brand',
					ean: '123456789',
					image: 'test_image_url',
					category: 'Test Category 2',
					description: 'Test Description',
					currentPrice: 100,
					weight: 500,
					weightUnit: 'g',
					store: 'Test Store',
				},
				{
					productID: 2,
					name: 'Test Product 2',
					brand: 'Test Brand',
					ean: '123456789',
					image: 'test_image_url',
					category: 'Test Category 2',
					description: 'Test Description',
					currentPrice: 45,
					weight: 500,
					weightUnit: 'g',
					store: 'Test Store',
				},
			];

			await createProducts(testProducts);

			const result1 = await productQuery.getProductsByFiltersWithLimit(
				null,
				{
					searchTerm: '',
					categories: '',
					minPrice: 0,
					maxPrice: 200,
					limit: 4,
					page: 1,
				},
			);
			expect(result1).toHaveLength(4);

			const result2 = await productQuery.getProductsByFiltersWithLimit(
				null,
				{
					searchTerm: '',
					categories: 'Test Category 2',
					minPrice: 0,
					maxPrice: 200,
					limit: 4,
					page: 1,
				},
			);
			expect(result2).toHaveLength(3);

			const result3 = await productQuery.getProductsByFiltersWithLimit(
				null,
				{
					searchTerm: '',
					categories: 'Test Category 2',
					minPrice: 30,
					maxPrice: 200,
					limit: 4,
					page: 1,
				},
			);
			expect(result3).toHaveLength(2);

			const result4 = await productQuery.getProductsByFiltersWithLimit(
				null,
				{
					searchTerm: '',
					categories: 'Test Category 2',
					minPrice: 30,
					maxPrice: 90,
					limit: 4,
					page: 1,
				},
			);
			expect(result4).toHaveLength(1);
		});
	});
});
