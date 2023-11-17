import { test, expect } from '@playwright/test';

test('Test Filtrering 1', async ({ page }) => {
  await page.goto('http://localhost:5173/project2/results');
  //Tester at ingenting er markert og at man får opp produkter uten filtrering (Da får man opp Byggryn, men ikke Krokanrull)
  await expect(page.getByRole('button', { name: ' Snacks & godteri' })).not.toHaveAttribute('style');
  await expect(page.getByText('Byggryn Hele 550g boks Møllerens')).toBeVisible();
  await expect(page.getByText('Freia Krokanrull 71g')).not.toBeVisible();

  /**
   * Trykker på chippen Snaks & godteri og sjekker at den blir aktivert
   * Når den er aktivert får den stilering med farge og bakgrunnsfarge
   * Da endres produktene som vises til å vise Krokanrull, men ikke Byggryn
   */
  await page.getByRole('button', { name: ' Snacks & godteri' }).click();
  await expect(page.getByRole('button', { name: ' Snacks & godteri' })).toHaveAttribute('style', 'background-color: rgb(40, 112, 148); color: white;');
  await expect(page.getByText('Byggryn Hele 550g boks Møllerens')).not.toBeVisible();
  await expect(page.getByText('Freia Krokanrull 71g')).toBeVisible();
  //Sjekker at Personlige artikler ikke er aktivert. Da vises ikke Paracet
  await expect(page.getByRole('button', { name: ' Personlige artikler' })).not.toHaveAttribute('style');
  await expect(page.getByText('Paracet Avlang Drasjert 500mg, 20 stk')).not.toBeVisible();

  /**
   * Trykker på Snacks og godteri igjen for å deaktivere den
   * Sjekker at stileringen er endret tilbake til å ikke ha farge og bakgrunnsfarge. Men nå som den er aktivert så har den istedet tom stil
   */
  await page.getByRole('button', { name: ' Snacks & godteri' }).click();
  await expect(page.getByRole('button', { name: ' Snacks & godteri' })).toHaveAttribute('style', '');

  /**
   * Trykker på både Snack og godteri og Personlige artikler, for å sjekke at man kan aktivere flere chipper på en gang
   * Sjekker at begge chippene har fått stilering for en aktivert chip
   * Sjekker at både Krokanrull og Paracet vises
   */
  await page.getByRole('button', { name: ' Snacks & godteri' }).click();
  await page.getByRole('button', { name: ' Personlige artikler' }).click();
  await expect(page.getByRole('button', { name: ' Snacks & godteri' })).toHaveAttribute('style', 'background-color: rgb(40, 112, 148); color: white;');
  await expect(page.getByRole('button', { name: ' Personlige artikler' })).toHaveAttribute('style', 'background-color: rgb(40, 112, 148); color: white;');
  await expect(page.getByText('Freia Krokanrull 71g')).toBeVisible();
  await expect(page.getByText('Paracet Avlang Drasjert 500mg, 20 stk')).toBeVisible();
});

test('Test Filtrering 2', async ({ page }) => {
  await page.goto('http://localhost:5173/project2/results');
  expect(page.getByText('Pris: 53.9 kr @ Joker')).toBeVisible();
  /**
   * Endrer pris-range til å være 0kr-51kr
   * Sjekker at produktene på 1. side er innenfor pris-range
   */
  await page.locator('.MuiSlider-track').click();
  await page.locator('.MuiSlider-track').click();
  await page.waitForLoadState('load');
  const tallListe = await getPriser(page);
  for (let i = 0; i < tallListe.length; i++) {
    expect(tallListe[i]).toBeLessThanOrEqual(51);
  } 

  /**
   * Sorterer etter synkende pris og sjekker at prisen er synkende
   */
  await page.getByRole('button', { name: ' Synkende pris' }).click();
  const tallListe2 = await getPriser(page);
  for (let i = 0; i < tallListe2.length - 1; i++) {
    expect(tallListe2[i]).toBeGreaterThanOrEqual(tallListe2[i+1]);
  }
  await expect(page.getByRole('button', { name: ' Synkende pris' })).toHaveAttribute('style', 'background-color: rgb(40, 112, 148); color: white;');


  /**
   * Sorterer etter stigende pris og sjekker at prisen er stigende
   */
  await page.getByRole('button', { name: ' Stigende pris' }).click();
  const tallListe3 = await getPriser(page);
  for (let i = 0; i < tallListe3.length - 1; i++) {
    expect(tallListe3[i]).toBeLessThanOrEqual(tallListe3[i+1]);
  }
  await expect(page.getByRole('button', { name: ' Stigende pris' })).toHaveAttribute('style', 'background-color: rgb(40, 112, 148); color: white;');
  await expect(page.getByRole('button', { name: ' Synkende pris' })).toHaveAttribute('style', '');


  /**
   * Fjerner sorteringen. Sjekker at ingen av knappene er valgt
   */
  await page.getByRole('button', { name: ' Stigende pris' }).click();
  await expect(page.getByRole('button', { name: ' Stigende pris' })).toHaveAttribute('style', '');
  await expect(page.getByRole('button', { name: ' Synkende pris' })).toHaveAttribute('style', '');
});





test('Test generelt', async ({ page }) => {
  await page.goto('http://localhost:5173/project2');
  page.waitForLoadState('load');
  /**
   * Sjekker at hoved-komponentene finnes på siden
   */
  await expect(page.getByTestId("TodaysItem")).toBeVisible();
  await expect(page.getByTestId("MyPageButton")).toBeVisible();
  await expect(page.getByRole('combobox', { name: 'Søk etter produkter...' })).toBeVisible();

  /**
   * Trykker på knapp for å komme til result-siden. Sjekker at URL-en blir korrekt
   */
  await page.locator('div').filter({ hasText: 'Snacks & godteri' }).nth(4).click();
  expect(page.url()).toBe("http://localhost:5173/project2/results")
  expect((await getPriser(page)).length).toBe(12);

  /**
   * Trykker på en av produktene for å komme til siden for det produktet og sjekker at URL-en blir korrekt
   */
  await page.getByText('Freia Krokanrull 71g').first().click();
  expect(page.url()).toBe("http://localhost:5173/project2/product/1817");

  /**
   * Trykker på logoen for å komme tilbake til forsiden og sjekker at URL-en blir korrekt
   */
  await page.getByRole('heading', { name: 'PRODUCTWAY' }).click();
  expect(page.url()).toBe("http://localhost:5173/project2/"); //Gjør at disse url-ene ikke er statiske
});

test('Test resultater', async ({ page }) => {
  await page.goto('http://localhost:5173/project2/results');
  /**
   * Sjekker at den er på side 1 (da har side-knappen med label="page 1" klassen Mui-selected), mens page 2 ikke har det
   */
  await expect(page.getByLabel("page 1")).toHaveClass("MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-sizeMedium MuiPaginationItem-text MuiPaginationItem-circular Mui-selected MuiPaginationItem-page css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root");
  await expect(page.getByLabel("page 2")).toHaveClass("MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-sizeMedium MuiPaginationItem-text MuiPaginationItem-circular MuiPaginationItem-page css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root");

  /**
   * Går til neste side og sjekker at den er på side 2
   */
  await page.getByLabel('Go to next page').click();  
  await expect(page.getByLabel("page 1")).toHaveClass("MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-sizeMedium MuiPaginationItem-text MuiPaginationItem-circular MuiPaginationItem-page css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root");
  await expect(page.getByLabel("page 2")).toHaveClass("MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-sizeMedium MuiPaginationItem-text MuiPaginationItem-circular Mui-selected MuiPaginationItem-page css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root");
  
  /**
   * Trykker på siste side og sjekker at den er på side 409. Da skal ikke side 2-knappen være synlig lenger
   */
  await page.getByLabel('Go to page 409').click();
  await expect(page.getByLabel("page 409")).toHaveClass("MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-sizeMedium MuiPaginationItem-text MuiPaginationItem-circular Mui-selected MuiPaginationItem-page css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root");
  await expect(page.getByLabel("page 2")).toBeHidden();

  /**
   * Trykker på første side og sjekker at den er på side 1. Da skal side 2-knappen være synlig igjen
   */
  await page.getByLabel('Go to page 1').click();
  await expect(page.getByLabel("page 1")).toHaveClass("MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-sizeMedium MuiPaginationItem-text MuiPaginationItem-circular Mui-selected MuiPaginationItem-page css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root");
  await expect(page.getByLabel("page 2")).toBeVisible();

  /**
   * Sjekker at siste side er endret når man legger inn filtrering. Nå er det 35 sider med Snacks og Godteri
   */
  await page.getByRole('button', { name: ' Snacks & godteri' }).click();
  await expect(page.getByLabel("page 35")).toBeVisible();
});

test('Test favorisering', async ({ page }) => {
  await page.goto('http://localhost:5173/project2/results');
  /**
   * Går inn på et produkt
   * Sjekker at den ikke er favorisert
   */
  await page.getByText('Byggryn Hele 550g boks Møllerens').click();
  await expect(page.getByLabel('like')).toHaveAttribute('style', 'background-color: grey;');
  /**
   * Favoriserer et produkt
   * Sjekker at fargen på knappen endrer seg til å være "likt"
   * Sjekker at jeg får feedback på at den er lagt til i favoritter
   */
  await page.getByLabel('like').click();
  await expect(page.getByLabel('like')).toHaveAttribute('style', 'background-color: rgb(40, 112, 148);');
  await expect(page.getByText('Lagt til i favoritter!')).toBeVisible();
  /**
   * Går til Min side
   * Sjekker at produktet finnes under Mine Favoritter
   * Sjekker at det bare finnes en favoritt
   * Sjekker at dette er Byggryn
   */
  await page.getByRole('button', { name: 'Min side' }).click();
  await expect(page.getByText('Byggryn Hele 550g boks Møllerens')).toBeVisible();
  expect((await page.$$('[class="productCardContainer"]')).length).toBe(1);
  const fitte = await page.$$('[class="productCardContainer"]');
  expect(await fitte[0].innerText()).toContain('Byggryn Hele 550g boks Møllerens'); //Her er det dobbelt await. Den er kanskje ikke helt heldig
  await page.getByText('Byggryn Hele 550g boks Møllerens').click()

  /**
   * Går tilbake til produktet. Fjerner favoriseringen
   * Sjekker at knappen endrer seg
   * Sjekker at den gir feedback på at det er fjernet
   */
  await page.getByLabel('like').click();
  await expect(page.getByLabel('like')).toHaveAttribute('style', 'background-color: grey;');
  await expect(page.getByText('Fjernet fra favoritter!')).toBeVisible();

  /**
   * Går inn i Min side
   * Sjekker at Byggryn ikke lenger finnes som favoritt
   */
  await page.getByRole('button', { name: 'Min side' }).click();
  await expect(page.getByText('Byggryn Hele 550g boks Møllerens')).toBeHidden();
  await expect(page.getByText('Ingen favoritter')).toBeVisible();
});

async function getPriser(page: any) {
  let elementsWithPris = await page.$$('*:is(:text("Pris: "))');

  let cont = 0;
  while (elementsWithPris.length === 0 && cont < 1000) { //Playwright er så ustabil på om den klarer å hente at jeg lar den prøver 1000 forsøk
    console.log("Prøver med forsøk: ", cont);
    elementsWithPris = await page.$$('*:is(:text("Pris: "))');
    cont++;
  }

  const tallListe: number[] = [];
  for (const element of elementsWithPris) {
    const elementText = await element.innerText();
    const tall = Number(elementText.split(" ")[1]);
    tallListe.push(tall);
  }

  return tallListe;
}
