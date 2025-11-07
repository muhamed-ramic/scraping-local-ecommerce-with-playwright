import puppeteer from 'puppeteer';
import * as cheerio from "cheerio";

const browser = await puppeteer.launch();
const page = await browser.newPage();
const webURL = "https://olx.ba/";

const doScraping = async ()=> {
    await page.goto(webURL);
    const $ = cheerio.load(await page.content());
    const products = $('h1.main-heading.normal-heading');
    const price = $('.price-wrap > div > span');
    const details = $('span.standard-tag');
    let productsList = [];
    products.each((index, element)=> {
        const object = {
            product: $(element).text().trim(),
            price: $(price[index]).text().trim(),
            details: $(details[index]).text().trim()
        }
        productsList.push(object);
    })
    console.log(productsList);
    await browser.close();
}
doScraping();

