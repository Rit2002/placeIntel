const express = require('express');
const dotenv = require('dotenv');

const main = require('../src/config/db.config');

const app = express();
dotenv.config();

main()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server successfully started at localhost:${process.env.PORT}`);
    
        });
    })
    .catch( err => console.log('Error : ' + err));