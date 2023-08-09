import { test, expect, Locator } from '@playwright/test';
import * as csv from "@fast-csv/parse";

test.describe('UI Testing' , () => {
  
  test('Find description', async ({ page}) => {

    await page.goto("https://standards.cencenelec.eu/dyn/www/f?p=CEN:105::RESET");
    const searchBox = page.locator("#STAND_REF");
    await searchBox.click();
    await searchBox.fill("27001");
    const searchButton = page.locator("#tformsub1");
    await searchButton.click();
    const result = page.locator("a").getByText("27001");
    await result.click();
    const generalButton = page.getByText("General");
    await generalButton.waitFor({state:"visible"});
    generalButton.click();
    const description = await page.locator("#topPage > div.bodyContainer > div.container > div.content-text.content-apex > div > div > div > div.Dash-Container > div.Structure > div.right-pane > table > tbody > tr:nth-child(4) > td").innerText();
    console.log("27001 | " + description);
  });
  
});