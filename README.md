# OLX.ba Product Scraper

This project is a Node.js script that scrapes product names, prices, and details from the [OLX.ba](https://olx.ba/) homepage using Puppeteer (for headless browser automation) and Cheerio (for HTML parsing).

## Features

- Uses Puppeteer to render JavaScript-heavy content.
- Extracts product name, price, and additional details.
- Outputs results as a structured JavaScript array.

## Requirements

- Node.js (v16 or higher recommended)
- npm (Node Package Manager)

## Installation

1. **Clone this repository or download the files.**
2. **Install dependencies:**

   ```bash
   npm install
   ```

   This will install:
   - `puppeteer` (headless browser)
   - `cheerio` (HTML parser)

## Usage

Run the scraper script with:

```bash
node main.js
```

The script will:
- Launch a headless browser
- Load the OLX.ba homepage
- Extract product names, prices, and details
- Print the results to the console

## Example Output

```json
[
  {
    "product": "BMW X6 3.0D  xdrive",
    "price": "82.900 KM",
    "details": "benzin"
  },
  {
    "product": "Audi A3 1.6TDI 2010.godina",
    "price": "11.990 KM",
    "details": "258.015 km"
  }
  // ...
]
```

## Customization

- To scrape a different page or extract more fields, adjust the selectors in `main.js`.
- For large-scale or automated scraping, consider adding error handling, delays, or proxy support.

## Troubleshooting

- If you get empty results, the OLX page structure may have changed. Inspect the site and update the selectors in `main.js`.
- Puppeteer may require additional dependencies on some systems (e.g., Linux). See the [Puppeteer troubleshooting guide](https://pptr.dev/troubleshooting/).

## License

MIT
