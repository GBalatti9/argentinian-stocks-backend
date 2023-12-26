const express = require('express');
const cors = require('cors');
const path = require('path');
const { webScrapping } = require('./helpers/puppeteer');

const scrapping = async () => {
    return await webScrapping();
}

const app = express();

app.use(cors());

const port = 3000;

app.get('/', async (req, res) => {
    res.send("App working correctly...");
})

app.get('/web-scrapping-api', async (req, res) => {
    const data  = await scrapping();
    res.json({ data });
})

app.listen( process.env.PORT || port, () => {
    console.log(`App listening on ${port}...`);
})
