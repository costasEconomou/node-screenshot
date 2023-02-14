const fs = require('fs');
const puppeteer = require('puppeteer');

// Specify file location and container ID
const file = '/src/index.html';
const containerID = '#container';
const format = '.jpg'; // '.jpg', '.png' or '.webp'
const outputDir = 'images/';

// Parse CSV file
var data = fs.readFileSync('sizes.csv').toLocaleString();
var rows = data.split("\r\n");

(async () =>{
    // Set URL and selector
    const website_url = __dirname + file;
    const selector = containerID;

    // Create a browser instance
    const browser = await puppeteer.launch();

    // Create a new page
    const page = await browser.newPage();

    for(var i = 0; i < rows.length - 1; i++) {
        console.log(`Saving image ${i+1}...`);

        // Open HTML doc and selector
        await page.goto(website_url);
        await page.waitForSelector(selector);
        var element = await page.$(selector);

        // Set container width and height in pixels
        var row = rows[i+1];
        var widthSel = row.split(",")[1];
        var heightSel = row.split(",")[2];
        await page.$eval(selector, (element, widthSel) => element.style.width = `${widthSel}px`, widthSel);
        await page.$eval(selector, (element, heightSel) => element.style.height = `${heightSel}px`, heightSel);

        // Capture screenshot
        await element.screenshot({
            path: `${outputDir}${row.split(",")[0]}_${i+1}${format}`,
            fullpage: false
        });    
    }

    // Close the browser instance
    await browser.close();
})();