const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('db connection is successful');
    })
    .catch((err) => console.log("Failed to connect to the database"))