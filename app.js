const express = require('express');
const cors = require('cors');
const path = require('path');
const { scrappWeb } = require('./helpers/webScrapping');

const app = express();

app.use(cors());
app.use(express.static( path.join ( __dirname, '../frontend/dist' ) ));

const port = 3000;

app.get('/', async (req, res) => {

    res.send("App working correctly...")
    // try {        
    //     const data  = await scrappWeb();
    //     res.json({ data });
    // } catch (error) {
    //     console.log(error);
    // }
})

app.get('/web-scrapping-api', async (req, res) => {
    const data  = await scrappWeb();
    res.json({ data });
})

app.listen( process.env.PORT || port, () => {
    console.log(`App listening on ${port}...`);
})