require('express-async-errors')
const express = require('express');
const app = express();
require('dotenv').config();
require('./src/db/dbConnection');
const port = process.env.PORT || 3000;
const router = require('./src/routers/index');
const errorHandlerMiddleware = require('./src/middlewares/errorHandler')
const cors = require('cors');
const corsOptions = require('./src/helpers/corsOptions');

//middlewares
app.use(cors(corsOptions))
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: "hello world" })
})

app.use("/api", router);


// hata yakalma
app.use(errorHandlerMiddleware)

app.listen(port, () => {
    console.log(`http://localhost:${port} is runnig`)
})