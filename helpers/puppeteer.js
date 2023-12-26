const puppeteer = require('puppeteer');
require('dotenv').config();

const webScrapping = async () => {

    try {
        const browser = await puppeteer.launch({
            args: [
                "--disable-setuid=sandbox",
                "--no-sandbox",
                "--single-process",
                "--no-zygote",
            ],
            executablePath: process.env.NODE_ENV === 'production' ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath()
        });
        const page = await browser.newPage();
        console.log('Open browser...');

        // const navigationTimeout = 300000;
        // page.setDefaultNavigationTimeout(navigationTimeout);
        console.log('Navigation to the page...');

        await page.goto('https://open.bymadata.com.ar/#/dashboard');
        const tableSelector = '.mat-table';
        await page.waitForSelector(tableSelector);

        const extractTableData = async (selector) => {
            return await page.$$eval(`${selector} tbody tr`, (rows) => {
                return rows.map((row) => {
                    const columns = Array.from(row.querySelectorAll('td'));
                    return columns.map((column) => column.textContent.trim());
                });
            });
        };

        console.log('Extracting table data...');
        const data = await extractTableData(tableSelector);
        console.log({ data });

        return data;


    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    webScrapping,
}