const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const scrappWeb = async () => {
    let browser;

    try {
        console.log("Opening browser...");
        browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto('https://open.bymadata.com.ar/#/dashboard', { timeout: 120000 });
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

        // const filePath = path.join(__dirname, '../../frontend', 'src', 'data', 'scrapedData.json');
        // console.log({ filePath });
        // await fs.promises.writeFile(filePath, JSON.stringify( data ));
        // await fs.promises.writeFile('data/scrapedData.json', JSON.stringify(data));
        // console.log('Data written to file successfully.')
        return data;
    } catch (error) {
        console.log(error);
    } finally {
        if (browser) {
            // await page.close();
            await browser.close();
        }
    }
};

module.exports = {
    scrappWeb,
};
