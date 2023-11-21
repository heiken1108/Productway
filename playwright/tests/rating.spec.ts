import { test, expect } from '@playwright/test';
import { checkIfRatingIconsAreCorrect } from '../support/support';

test.beforeEach(async ({ page }) => {
    await page.goto('./results');
});

test.describe('Test rating-functionality', () => {
    test('Test add a rating', async ({ page }) => {
        /**
         * Clicks on the product Byggryn
         * Checks that it hasn´t been rated yet. (The ratings-options all have the style-class MuiRating-iconEmpty)
         */
        await page.getByRole('heading', { name: 'Byggryn Hele 550g boks Møllerens' }).click();
        await page.waitForLoadState('load');
        await checkIfRatingIconsAreCorrect(page, 0)
    
        /**
         * Clicks on the rating "Very Satisfied", giving it a rating of 5
         * Checks that the rating has been changed to "Very Satisfied" (The first 4 icons have the style-class MuiRating-iconEmpty, while the last one has MuiRating-iconFilled)
         * Checks that it gives feedback about the new rating
         */
        await page.locator('label').filter({ hasText: 'Very Satisfied' }).click();
        await checkIfRatingIconsAreCorrect(page, 5)
        await expect(page.getByText('Produkt vurdert til 5')).toBeVisible();
    
        /**
         * Go to My Page
         * Check that the product appears under My Ratings
         */
        await page.getByTestId('MyPageButton').click();
        await page.waitForLoadState('load');
        await expect(page.getByText('Byggryn Hele 550g boks Møllerens')).toBeVisible();
        await page.goto('./product/1004');
    
        /**
         * Go back to the product
         * Remove the rating
         * Check that all rating-options have the style-class MuiRating-iconEmpty
         * Checks that it gives feedback about the removal
         */
        await page.locator('label').filter({ hasText: 'Very Satisfied' }).click();
        await checkIfRatingIconsAreCorrect(page, 0)
        await expect(page.getByText('Fjernet vurdering!')).toBeVisible();
        
        /**
         * Go to My Page to see that tha product does no longer appear under My Ratings
         */
        await page.goto('./myPage');
        await page.waitForLoadState('load');
        await expect(page.getByText('Byggryn Hele 550g boks Møllerens')).not.toBeVisible();
    });
    
    test('Test add several ratings', async ({ page }) => {
        /**
         * Clicks on the product Byggryn
         * Checks that it hasn´t been rated yet. (The ratings-options all have the style-class MuiRating-iconEmpty)
         */
        await page.getByRole('heading', { name: 'Byggryn Hele 550g boks Møllerens' }).click();
        await checkIfRatingIconsAreCorrect(page, 0)
    
        /**
         * Clicks on the rating "Very Satisfied", giving it a rating of 5
         * Checks that the rating has been changed to "Very Satisfied" (The first 4 icons have the style-class MuiRating-iconEmpty, while the last one has MuiRating-iconFilled)
         * Checks that it gives feedback about the new rating
         */
        await page.locator('label').filter({ hasText: 'Very Satisfied' }).click();
        await checkIfRatingIconsAreCorrect(page, 5)
        await expect(page.getByText('Produkt vurdert til 5')).toBeVisible();
    
        /**
         * Go back to the Product-page
         * Click on the Product Weetos
         * Checks that it hasn´t been rated yet. (The ratings-options all have the style-class MuiRating-iconEmpty)
         */
        await page.goto('./results');
        await page.getByRole('heading', { name: 'Weetos Choco 375g Weetabix' }).click();
        await checkIfRatingIconsAreCorrect(page, 0)
    
        /**
         * Click on the rating "Dissatisfied", giving it a rating of 2
         * Checks that the rating has been changed to "Dissatisfied" (The second icon has the style-class MuiRating-iconFilled, while the other 4 have MuiRating-iconEmpty)
         * Checks that it gives feedback about the new rating
         */
        await page.locator('label').filter({ hasText: /^Dissatisfied$/ }).click();
        await checkIfRatingIconsAreCorrect(page, 2)
        await expect(page.getByText('Produkt vurdert til 2')).toBeVisible();
    
        /**
         * Go to My Page
         * Check that both Byggryn and Weetos appears under My Ratings
         */
        await page.getByTestId('MyPageButton').click();
        await page.waitForLoadState('load');
        await expect(page.getByText('Byggryn Hele 550g boks Møllerens')).toBeVisible(); 
        await expect(page.getByText('Weetos Choco 375g Weetabix')).toBeVisible();
    
        /**
         * Go back to the product Byggryn
         * Remove the rating
         * Check that all rating-options have the style-class MuiRating-iconEmpty
         * Checks that it gives feedback about the removal
         */
        await page.goto('./results');
        await page.getByRole('heading', { name: 'Byggryn Hele 550g boks Møllerens' }).click();
        await page.locator('label').filter({ hasText: 'Very Satisfied' }).click();
        await checkIfRatingIconsAreCorrect(page, 0)
        await expect(page.getByText('Fjernet vurdering!')).toBeVisible();
    
        /**
         * Go to My Page
         * Check that only Weetos appears under My Ratings
         */
        await page.getByTestId('MyPageButton').click();
        await page.waitForLoadState('load');
        await expect(page.getByText('Byggryn Hele 550g boks Møllerens')).not.toBeVisible(); 
        await expect(page.getByText('Weetos Choco 375g Weetabix')).toBeVisible(); 
    
        /**
         * Go back to the product Weetos
         * Remove the rating
         * Check that all rating-options have the style-class MuiRating-iconEmpty
         * Checks that it gives feedback about the removal
         */
        await page.goto('./results');
        await page.getByRole('heading', { name: 'Weetos Choco 375g Weetabix' }).click();
        await page.locator('label').filter({ hasText: /^Dissatisfied$/ }).click();
        await checkIfRatingIconsAreCorrect(page, 0)
        await expect(page.getByText('Fjernet vurdering!')).toBeVisible();
    
        /**
         * Go to My Page
         * Check that no products appears under My Ratings
         */
        await page.getByTestId('MyPageButton').click();
        await page.waitForLoadState('load');
        await expect(page.getByText('Byggryn Hele 550g boks Møllerens')).not.toBeVisible(); 
        await expect(page.getByText('Weetos Choco 375g Weetabix')).not.toBeVisible(); 
    });
    
    test('Test change rating', async ({ page }) => {
        /**
         * Clicks on the product Byggryn
         * Checks that it hasn´t been rated yet. (The ratings-options all have the style-class MuiRating-iconEmpty)
         */
        await page.getByRole('heading', { name: 'Byggryn Hele 550g boks Møllerens' }).click();
        await checkIfRatingIconsAreCorrect(page, 0)
    
        /**
         * Clicks on the rating "Very Satisfied", giving it a rating of 5
         * Checks that the rating has been changed to "Very Satisfied" (The first 4 icons have the style-class MuiRating-iconEmpty, while the last one has MuiRating-iconFilled)
         * Checks that it gives feedback about the new rating
         */
        await page.locator('label').filter({ hasText: 'Very Satisfied' }).click();
        await checkIfRatingIconsAreCorrect(page, 5)
        await expect(page.getByText('Produkt vurdert til 5')).toBeVisible();
    
        /**
         * Clicks on the rating "Dissatisfied", giving it a rating of 2
         * Checks that the rating has been changed to "Dissatisfied" (The second icon has the style-class MuiRating-iconFilled, while the other 4 have MuiRating-iconEmpty)
         * Checks that it gives feedback about the new rating
         */
        await page.locator('label').filter({ hasText: /^Dissatisfied$/ }).click();
        await checkIfRatingIconsAreCorrect(page, 2)
        await expect(page.getByText('Produkt vurdert til 2')).toBeVisible();
        
        /**
         * Refresh page
         * See that the rating is still 2
         */
        await page.goto('./product/1004');
        await checkIfRatingIconsAreCorrect(page, 2)

        /**
         * Click on the rating "Neutral", giving it a rating of 3
         * Checks that the rating has been changed to "Neutral" (The third icon has the style-class MuiRating-iconFilled, while the other 4 have MuiRating-iconEmpty)
         * Checks that it gives feedback about the new rating
         */
        await page.locator('label').filter({ hasText: 'Neutral' }).click();
        await checkIfRatingIconsAreCorrect(page, 3);
        await expect(page.getByText('Produkt vurdert til 3')).toBeVisible();
    
        /**
         * Refresh page
         * See that the rating is still 3
         */
        await page.goto('./product/1004');
        await checkIfRatingIconsAreCorrect(page, 3);
        
        /** 
         * Remove the rating 3
         * Checks that all rating-options have the style-class MuiRating-iconEmpty
         * Checks that it gives feedback about the removal
         */
        await page.locator('label').filter({ hasText: 'Neutral' }).click();
        await checkIfRatingIconsAreCorrect(page, 0)
        await expect(page.getByText('Fjernet vurdering!')).toBeVisible();
    
        /**
         * Go to My Page
         * Check that Byggryn does not appear under My Ratings
         */
        await page.getByTestId('MyPageButton').click();
        await page.waitForLoadState('load');
        await expect(page.getByText('Byggryn Hele 550g boks Møllerens')).not.toBeVisible();
    });
});