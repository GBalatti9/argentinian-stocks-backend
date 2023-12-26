const puppeteer = require('puppeteer');

const webScrapping = async () => {

    try {
        const browser = await puppeteer.launch({
            headless: 'new',
            slowMo: 400
        });
        const page = await browser.newPage();
        console.log('Open browser...');

        const navigationTimeout = 300000;
        page.setDefaultNavigationTimeout(navigationTimeout);
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