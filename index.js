const puppeteer = require('puppeteer');

const urlArray = [
    'https://wikipedia.org',
    'https://google.com',
    'https://youtube.com'
];

const widthArray = [
    1280,
    720,
    480
];

(async () =>{
    // Create a browser instance
    const browser = await puppeteer.launch();

    // Create a new page
    const page = await browser.newPage();
    const website_url = 'https://wikipedia.org';

    // Set viewport width and height
    // await page.setViewport({ width: 1280, height: 720 });

    for(var i = 0; i < urlArray.length; i++) {
        console.log(`Saving page ${i+1}...`);

        await page.setViewport({ width: widthArray[i], height: 720 });
        const website_url = urlArray[0];

        // Open URL in current page
        await page.goto(website_url, { waitUntil: 'networkidle0' });

        // Capture screenshot
        await page.screenshot({
            path: `images/screenshot_full${i+1}.jpg`,
            fullpage: false
        });
        
    }

    // Open URL in current page
    //await page.goto(website_url, { waitUntil: 'networkidle0' });

    // Capture screenshot
    //await page.screenshot({
    //    path: 'screenshot1.jpg'
    //});

    // Close the browser instance
    await browser.close();
})();