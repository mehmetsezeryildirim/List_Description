import { test, expect, Locator } from '@playwright/test';
//import * as csv from "@fast-csv/parse";
import fs from 'fs'
const { writeFile } = require('fs');

test.describe('UI Testing' , () => {
  let list = GetStandardList()
  let resultList:string[] = [];
  
  list.forEach(element => {
    debugger;
    test(`Find description for ${element.Name}`, async ({ page}) => {
      await page.goto("https://standards.cencenelec.eu/dyn/www/f?p=CEN:105::RESET");
      const searchBox = page.locator("#STAND_REF");
      await searchBox.click();
      await searchBox.fill(element.Name);
      const searchButton = page.locator("#tformsub1");
      await searchButton.click();
      const result = page.locator("a").getByText(element.Name);
      await result.click();
      const generalButton = page.getByText("General");
      await generalButton.waitFor({state:"visible"});
      generalButton.click();
      const description = await page.locator("#topPage > div.bodyContainer > div.container > div.content-text.content-apex > div > div > div > div.Dash-Container > div.Structure > div.right-pane > table > tbody > tr:nth-child(4) > td").innerText();
      console.log(element.Name + " | " + description);
      
      resultList.push(element.Name + " | " + description);
      WriteStandardList(JSON.stringify(resultList, null, 2));
    });
  });
  
});

function GetStandardList() {
  return JSON.parse(fs.readFileSync('doc.json', 'utf-8'))
}

function WriteStandardList(txt: string) {
  //fs.writeFileSync('result.json' ,txt);


  writeFile('result.json', JSON.stringify(txt, null, 2), (error) => {
    if (error) {
      console.log('An error has occurred ', error);
      return;
    }
    console.log('Data written successfully to disk');
  });
}
