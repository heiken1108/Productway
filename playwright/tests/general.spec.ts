import { test, expect } from '@playwright/test';
import { getPriser, getProducts } from '../support/support';

test.describe('Test general', () => {
    test('Test general functionality', async ({ page }) => {
        /**
         * Go to the front page and check that the URL is correct
         */
        await page.goto('http://localhost:5173/project2');
        expect(page.url()).toBe("http://localhost:5173/project2")
        page.waitForLoadState('load');
    
        /**
         * Check that the main components are visible on the page
         */
        await expect(page.getByTestId("TodaysItem")).toBeVisible();
        await expect(page.getByTestId("MyPageButton")).toBeVisible();
        await expect(page.getByRole('combobox', { name: 'Søk etter produkter...' })).toBeVisible();
    
        /**
         * Trykker på knapp for å komme til result-siden. Sjekker at URL-en blir korrekt
         * Presses a category to go to the result-page. Checks that the URL is correct
         * Checks that there are 12 products on the page
         */
        await page.locator('div').filter({ hasText: 'Snacks & godteri' }).nth(4).click();
        expect(page.url()).toBe("http://localhost:5173/project2/results")
        expect((await getProducts(page)).length).toBe(12);
    
        /**
         * Clicks on a product to go to the product-page. Checks that the URL for the product is correct
         */
        await page.getByText('Freia Krokanrull 71g').first().click();
        expect(page.url()).toBe("http://localhost:5173/project2/product/1817");
    
        /**
         * Clicks on the logo to go back to the front page. Checks that the URL is correct
         */
        await page.getByRole('heading', { name: 'PRODUCTWAY' }).click();
        expect(page.url()).toBe("http://localhost:5173/project2/"); //Gjør at disse url-ene ikke er statiske
    });

    test('Test results-page', async ({ page }) => {
        await page.goto('http://localhost:5173/project2/results');
        /**
         * Checks that it is on page 1 (then the page-button with label="page 1" has the class Mui-selected), while page 2 does not have it
         */
        await expect(page.getByLabel("page 1")).toHaveClass(/Mui-selected/);
        await expect(page.getByLabel("page 2")).not.toHaveClass(/Mui-selected/);
    
        /**
         * Presses the button to go to the next page
         * Checks that it is on page 2 (then the page-button with label="page 2" has the class Mui-selected), while page 1 does not have it anymore
         */
        await page.getByLabel('Go to next page').click();  
        await expect(page.getByLabel("page 1")).not.toHaveClass(/Mui-selected/);
        await expect(page.getByLabel("page 2")).toHaveClass(/Mui-selected/);
    
        /**
         * Presses the button to go to the first page
         * Checks that it is on page 1
         */
        await page.getByLabel('Go to page 1').click();
        await expect(page.getByLabel("page 1")).toHaveClass(/Mui-selected/);
        await expect(page.getByLabel("page 2")).not.toHaveClass(/Mui-selected/);

        /**
         * Goes back and forth to the second and first page
         * Checks that it is on page 1
         */
        await page.getByLabel('Go to next page').click();
        await page.getByLabel('Go to previous page').click();
        await expect(page.getByLabel("page 1")).toHaveClass(/Mui-selected/);
        await expect(page.getByLabel("page 2")).not.toHaveClass(/Mui-selected/);
    });
});

