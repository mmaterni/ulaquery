"use strict";

const puppeteer = require('puppeteer');

// describe('DataManager', () => {
//     let browser;
//     let page;

//     beforeAll(async () => {
//         browser = await puppeteer.launch();
//         page = await browser.newPage();
//         const url = 'http://localhost/static/index.html';
//         await page.goto(url);
//     });

//     afterAll(async () => {
//         await browser.close();
//     });

//     test('should return the sum of two numbers', async () => {
//         const result = await page.evaluate(() => {
//             const dataManager = new DataManager();
//             return dataManager.addNumbers(2, 3);
//         });

//         expect(result).toBe(5);
//     });
// });

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.example.com');
  // Altre azioni sulle pagine...

  await browser.close();
}

run();
