// installed modules
const express = require('express');
const dotenv = require('dotenv');

// created modules
const main = require('../src/config/db.config');
const companyRoute = require('./routes/v1/company.route');
const hiringRoute = require('./routes/v1/hiring.route');
const eligibilityRoute = require('./routes/v1/eligibility.route');

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.use('/pi/api/v1', companyRoute);
app.use('/pi/api/v1', hiringRoute);
app.use('/pi/api/v1', eligibilityRoute);

main()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server successfully started at localhost:${process.env.PORT}`);
    
        });
    })
    .catch( err => console.log('Error : ' + err));