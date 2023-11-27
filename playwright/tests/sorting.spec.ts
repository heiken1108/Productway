import { test, expect } from '@playwright/test';
import { getPriser } from '../support/support';

test.beforeEach(async ({ page }) => {
	await page.goto('./results');
});

test.describe('Test sorting-functionliaty', () => {
	test('Test sorting by price', async ({ page }) => {
		/**
		 * Clicks on "Synkende pris" to sort by descending price
		 * Checks that the price is descending
		 * Checks that the styling is changed to show that the "Synkende pris"-button is selected
		 */
		await page.getByRole('button', { name: ' Synkende pris' }).click();
		const tallListe2 = await getPriser(page);
		for (let i = 0; i < tallListe2.length - 1; i++) {
			expect(tallListe2[i]).toBeGreaterThanOrEqual(tallListe2[i + 1]);
		}
		await expect(
			page.getByRole('button', { name: ' Synkende pris' }),
		).toHaveAttribute(
			'style',
			'background-color: rgb(40, 112, 148); color: white;',
		);

		/**
		 * Clicks on "Stigende pris" to sorts by ascending price
		 * Checks that the price is ascending
		 * Checks that the styling is changed to show that the "Stigende pris"-button is selected and the "Synkende pris"-button is not selected
		 */
		await page.getByRole('button', { name: ' Stigende pris' }).click();
		const tallListe3 = await getPriser(page);
		for (let i = 0; i < tallListe3.length - 1; i++) {
			expect(tallListe3[i]).toBeLessThanOrEqual(tallListe3[i + 1]);
		}
		await expect(
			page.getByRole('button', { name: ' Stigende pris' }),
		).toHaveAttribute(
			'style',
			'background-color: rgb(40, 112, 148); color: white;',
		);
		await expect(
			page.getByRole('button', { name: ' Synkende pris' }),
		).toHaveAttribute('style', '');

		/**
		 * Clicks on "Stigende pris" to remove the sorting
		 * Checks that none of the buttons are selected
		 */
		await page.getByRole('button', { name: ' Stigende pris' }).click();
		await expect(
			page.getByRole('button', { name: ' Stigende pris' }),
		).toHaveAttribute('style', '');
		await expect(
			page.getByRole('button', { name: ' Synkende pris' }),
		).toHaveAttribute('style', '');
	});
});
