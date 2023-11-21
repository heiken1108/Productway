import { test, expect } from '@playwright/test';
import { getProducts } from '../support/support';

test.beforeEach(async ({ page }) => {
    await page.goto('./results');
});

test.describe('Test favorite-functionality', () => {
    test('Test favorisering', async ({ page }) => {
        /**
         * Clicks on a product, Byggryn
         * Checks that is hasn´t been favorited
         */
        await page.getByText('Byggryn Hele 550g boks Møllerens').click();
        await expect(page.getByLabel('like')).toHaveAttribute('style', 'background-color: grey; outline: none;');

        /**
         * Favorites the product, Byggryn
         * Checks that the color on the button changes to appear as "favorited"
         * Checks that it gives feedback that it has been favorited
         */
        await page.getByLabel('like').click();
        await expect(page.getByLabel('like')).toHaveAttribute('style', 'background-color: rgb(40, 112, 148); outline: none;');
        await expect(page.getByText('Lagt til i favoritter!')).toBeVisible();

        /**
         * Goes to Min side
         * Checks that the product is under Mine Favoritter
         * Checks that there is only one favorite
         * Checks that this is Byggryn
         */
        await page.getByRole('button', { name: 'Min side' }).click();
        await expect(page.getByText('Byggryn Hele 550g boks Møllerens')).toBeVisible();
        expect((await getProducts(page)).length).toBe(1);
        const products = await page.$$('[class="productCardContainer"]');
        expect(await products[0].innerText()).toContain('Byggryn Hele 550g boks Møllerens');
        await page.getByText('Byggryn Hele 550g boks Møllerens').click();

        /**
         * Goes back to the product, Byggryn
         * Remvoes it as a favorite
         * Checks that the button changes to appear as "not favorited"
         * Checks that it gives feedback that it has been removed as a favorite
         */
        await page.getByLabel('like').click();
        await expect(page.getByLabel('like')).toHaveAttribute('style', 'background-color: grey; outline: none;');
        await expect(page.getByText('Fjernet fra favoritter!')).toBeVisible();

        /**
         * Goes to Min Side
         * Checks that Byggryn no longer is a favorite
         */
        await page.getByRole('button', { name: 'Min side' }).click();
        await expect(page.getByText('Byggryn Hele 550g boks Møllerens')).toBeHidden();
        await expect(page.getByText('Ingen favoritter')).toBeVisible();
    });
});