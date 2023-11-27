import { test, expect } from '@playwright/test';
import { getPriser } from '../support/support';

test.beforeEach(async ({ page }) => {
	await page.goto('./results');
});

test.describe('Test filtering-functionliaty', () => {
	test('Test filtrering by categories', async ({ page }) => {
		/**
		 * Checks that the chip Snacks & godteri is not activated
		 * Checks that Byggryn is visible, but not Krokanrull
		 */
		await expect(
			page.getByRole('button', { name: ' Snacks & godteri' }),
		).not.toHaveAttribute('style');
		await expect(
			page.getByText('Byggryn Hele 550g boks Møllerens'),
		).toBeVisible();
		await expect(page.getByText('Freia Krokanrull 71g')).not.toBeVisible();

		/**
		 * Clicks on the chip Snacks & godteri
		 * Checks that it is activated. When it is activated it gets styling with color and background-color
		 * Checks that the products that are shown are Krokanrull, but not Byggryn, according to the filtering
		 */
		await page.getByRole('button', { name: ' Snacks & godteri' }).click();
		await expect(
			page.getByRole('button', { name: ' Snacks & godteri' }),
		).toHaveAttribute(
			'style',
			'background-color: rgb(40, 112, 148); color: white;',
		);
		await expect(
			page.getByText('Byggryn Hele 550g boks Møllerens'),
		).not.toBeVisible();
		await expect(page.getByText('Freia Krokanrull 71g')).toBeVisible();

		/**
		 * Checks that the chip Personlige artikler is not activated. Then Paracet will not shown
		 * Checks that Paracet is not shown
		 */
		await expect(
			page.getByRole('button', { name: ' Personlige artikler' }),
		).not.toHaveAttribute('style');
		await expect(
			page.getByText('Paracet Avlang Drasjert 500mg, 20 stk'),
		).not.toBeVisible();

		/**
		 * Clicks on the chip Snacks & godteri again to deactivate it
		 * Checks that the styling is changed back to not have color and background-color. But now that it is activated it has empty styling
		 */
		await page.getByRole('button', { name: ' Snacks & godteri' }).click();
		await expect(
			page.getByRole('button', { name: ' Snacks & godteri' }),
		).toHaveAttribute('style', '');

		/**
		 * Clicks on the chip Personlige artikler to activate it
		 * Clicks on the chip Snacks & godteri to activate it
		 * Checks that both chips have gotten styling for an activated chip
		 * Checks that both Krokanrull and Paracet are shown
		 */
		await page.getByRole('button', { name: ' Snacks & godteri' }).click();
		await page
			.getByRole('button', { name: ' Personlige artikler' })
			.click();
		await expect(
			page.getByRole('button', { name: ' Snacks & godteri' }),
		).toHaveAttribute(
			'style',
			'background-color: rgb(40, 112, 148); color: white;',
		);
		await expect(
			page.getByRole('button', { name: ' Personlige artikler' }),
		).toHaveAttribute(
			'style',
			'background-color: rgb(40, 112, 148); color: white;',
		);
		await expect(page.getByText('Freia Krokanrull 71g')).toBeVisible();
		await expect(
			page.getByText('Paracet Avlang Drasjert 500mg, 20 stk'),
		).toBeVisible();
	});

	test('Test filtering by price-range', async ({ page }) => {
		/**
		 * Checks that an item with the price 53.9kr is shown
		 */
		expect(page.getByText(/Pris: 53.9 kr/)).toBeVisible();

		/**
		 * Changes the price-range to be 0kr-51kr
		 * Checks that the products on the page are within the price-range
		 */
		await page.locator('.MuiSlider-track').click();
		await page.locator('.MuiSlider-track').click();
		await page.waitForLoadState('load');
		const priser = await getPriser(page);
		for (let i = 0; i < priser.length; i++) {
			expect(priser[i]).toBeLessThanOrEqual(51);
		}
	});
});
