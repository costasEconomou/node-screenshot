const puppeteer = require('puppeteer');

// Specify file location and container ID
const file = '/src/index.html';
const containerID = '#container';

const widthArray = [
    1280,
    720,
    480
];

const heightArray = [
    520,
    1280,
    720
];

(async () =>{
    // Set URL and selector
    const website_url = __dirname + file;
    const selector = containerID;

    // Create a browser instance
    const browser = await puppeteer.launch();

    // Create a new page
    const page = await browser.newPage();

    for(var i = 0; i < widthArray.length; i++) {
        console.log(`Saving image ${i+1}...`);

        // Open HTML doc and selector
        await page.goto(website_url);
        await page.waitForSelector(selector);
        var element = await page.$(selector);

        // Set container width and height in pixels
        var widthSel = widthArray[i];
        var heightSel = heightArray[i];
        await page.$eval(selector, (element, widthSel) => element.style.width = `${widthSel}px`, widthSel);
        await page.$eval(selector, (element, heightSel) => element.style.height = `${heightSel}px`, heightSel);

        // Capture screenshot
        await element.screenshot({
            path: `images/screenshot_${i+1}.jpg`,
            fullpage: false
        });
        
    }

    // Close the browser instance
    await browser.close();
})();