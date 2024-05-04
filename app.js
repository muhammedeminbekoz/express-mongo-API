const express = require('express');
const app = express();
require('dotenv').config();
require('./src/db/dbConnection');

const port = process.env.PORT || 5000;



app.get('/', (req, res) => {
    res.status(200).json("hello world")
})


app.listen(port, () => {
    console.log(`http://localhost:${port} is runnig`)
})