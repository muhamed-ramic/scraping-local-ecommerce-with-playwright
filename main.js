import puppeteer from 'puppeteer';
import * as cheerio from "cheerio";
import "dotenv/config";
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // Make sure to set this in your .env file
});

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
    
    // Send products to ChatGPT for processing
    console.log('\nProcessing products with ChatGPT...\n');
    const sortedCars = await processCarsWithChatGPT(productsList);
    console.log('Sorted Cars (Lowest to Highest Price):');
    console.log(JSON.stringify(sortedCars, null, 2));
    
    await browser.close();
}

// Function to process products with ChatGPT
async function processCarsWithChatGPT(products) {
    try {
        const prompt = `
You are given a list of products. Please:
1. Filter only the products that are cars/vehicles
2. Sort them by price from lowest to highest
3. Return the result as a JSON array

Here are the products:
${JSON.stringify(products, null, 2)}

Return ONLY a valid JSON array with the filtered and sorted cars. Each item should have: product, price, and details fields.
If no cars are found, return an empty array [].
`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // or "gpt-4" for better results
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant that processes product data. Always return valid JSON."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.3, // Lower temperature for more consistent results
        });

        const result = response.choices[0].message.content.trim();
        
        // Parse the JSON response
        // Remove markdown code blocks if present
        const jsonString = result.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        const sortedCars = JSON.parse(jsonString);
        
        return sortedCars;
    } catch (error) {
        console.error('Error processing with ChatGPT:', error.message);
        return [];
    }
}

doScraping();
