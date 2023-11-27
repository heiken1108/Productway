import { expect } from '@playwright/test';

type PageType = any;

export async function getPriser(page: PageType): Promise<PageType[]> {
	let elementsWithPris = await getProducts(page);

	const tallListe: number[] = [];
	for (const element of elementsWithPris) {
		const elementText = await element.innerText();
		const tall = Number(elementText.split(' ')[1]);
		tallListe.push(tall);
	}

	return tallListe;
}

export async function getProducts(page: PageType): Promise<PageType[]> {
	let Products = await page.$$('*:is(:text("Pris: "))');

	let cont = 0;
	while (Products.length === 0 && cont < 1000) {
		Products = await page.$$('*:is(:text("Pris: "))');
		cont++;
	}

	return Products;
}

export async function getProductsWithName(
	page: PageType,
	name: string,
): Promise<PageType[]> {
	let Products = await page.$$('*:is(:text("' + name + '"))');

	let cont = 0;
	while (Products.length === 0 && cont < 1000) {
		console.log('Prøver med forsøk: ', cont);
		Products = await page.$$('*:is(:text("' + name + '"))');
		cont++;
	}

	return Products;
}

export async function checkIfRatingIconsAreCorrect(
	page: PageType,
	rating: number,
): Promise<void> {
	const index = rating - 1;
	if (index === -1) {
		for (let i = 0; i < 5; i++) {
			await expect(page.locator('.MuiRating-icon').nth(i)).toHaveClass(
				/MuiRating-iconEmpty/,
			);
		}
	} else if (index >= 0 && index <= 4) {
		for (let i = 0; i < 5; i++) {
			if (i === index) {
				await expect(
					page.locator('.MuiRating-icon').nth(i),
				).toHaveClass(/MuiRating-iconFilled/);
			} else {
				await expect(
					page.locator('.MuiRating-icon').nth(i),
				).toHaveClass(/MuiRating-iconEmpty/);
			}
		}
	}
}
