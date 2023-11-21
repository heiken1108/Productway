import { test, expect } from '@playwright/test';
import { getProducts, getProductsWithName } from '../support/support';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/project2');
});

test.describe('Test searching-functionality', () => {
    test('Test searching', async ({ page }) => {
        /**
         * Writes "pastasaus med pa" in the search-bar
         * Checks that it gets the suggestion "Pastasaus med Parmigiano Reggiano 400 g"
         */
        await page.getByRole('combobox', { name: 'Søk etter produkter...' }).click();
        await page.getByRole('combobox', { name: 'Søk etter produkter...' }).fill('pastasaus med pa');
        //expect(page.getByRole('option', { name: 'Pastasaus med Parmigiano Reggiano 400 g' })).toBeVisible();
    
        /**
         * Clicks on the suggestion to fill the search-bar with the text
         * Presses enter to search
         * Checks that it gets only one product
         * Checks that the product is "Pastasaus med Parmigiano Reggiano 400 g"
         */
        await page.getByRole('option', { name: 'Pastasaus med Parmigiano Reggiano 400 g' }).click();  
        await page.getByRole('combobox', { name: 'Søk etter produkter...' }).press('Enter');
        expect((await getProducts(page)).length).toBe(1);
        await expect(page.getByRole('heading', { name: 'Pastasaus med Parmigiano Reggiano 400 g' })).toBeVisible();
    
        /**
         * Empties the search-bar
         * Writes "saus" in the search-bar
         * Presses enter to search for all products with "saus" in the name
         * Checks that it gets 12 products (the page limit)
         * Checks that it gets as many products as there are products with "saus" in the name (also 12)
         */
        await page.getByRole('button', { name: 'Clear' }).click();
        await page.getByRole('combobox', { name: 'Søk etter produkter...' }).click();
        await page.getByRole('combobox', { name: 'Søk etter produkter...' }).fill('saus');
        await page.getByRole('combobox', { name: 'Søk etter produkter...' }).press('Enter');
        expect((await getProducts(page)).length).toBe(12);
        expect((await getProducts(page)).length).toBe((await getProductsWithName(page, 'saus')).length - 1); //getProductsWithName also retrieves the search-term. Therefore the length is subtracted by 1
    
        /**
         * Writes "dededede" in the search-bar
         * Presses enter to search for a product that doesn´t exist
         * Checks that it gets no products
         */
        await page.getByRole('button', { name: 'Clear' }).click();
        await page.getByRole('combobox', { name: 'Søk etter produkter...' }).fill('dededede');
        await page.getByRole('combobox', { name: 'Søk etter produkter...' }).press('Enter');
        expect((await getProducts(page)).length).toBe(0);
        expect(page.getByText('Ingen produkter matcher søket ditt :(')).toBeVisible();
    
        /**
         * Epries the search-bar
         * Writes "saus" in the search-bar
         * Presses enter to search for all products with "saus" in the name
         * Clicks on the chip Snacks & godteri to only get products in that category. With the searchtem and the category-filter, there should be no products
         * Checks that there are no products shown
         */
        await page.getByLabel('delete').click();
        await page.getByRole('combobox', { name: 'Søk etter produkter...' }).click();
        await page.getByRole('combobox', { name: 'Søk etter produkter...' }).fill('saus');
        await page.getByRole('combobox', { name: 'Søk etter produkter...' }).press('Enter');
        await page.getByRole('button', { name: ' Snacks & godteri' }).click();
        expect((await getProducts(page)).length).toBe(0);
    
        /**
         * Clicks on the chip Middagstilbehør to activate it. Now there should be some products with the "saus" in the name
         * Checks that there now are products
         */
        await page.getByRole('button', { name: ' Middagstilbehør' }).click();
        expect((await getProducts(page)).length).toBeGreaterThan(0);
    });
});