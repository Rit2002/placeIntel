// installed modules
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// created modules
const main = require('./config/db.config');
const { connectRedis } = require('./config/redis.config');
const companyRoute = require('./routes/v1/company.route');
const hiringRoute = require('./routes/v1/hiring.route');
const authRoute = require('./routes/v1/auth.route');

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());

app.use('/pi/api/v1', authRoute);
app.use('/pi/api/v1', companyRoute);
app.use('/pi/api/v1', hiringRoute);


const initializeConnection = async () => {
    try {
        await Promise.all([
            main(),
            connectRedis()
        ]);

        app.listen(process.env.PORT, () => {
            console.log(`Server successfully started at localhost:${process.env.PORT}`);
    
        });

    } catch (error) {
        console.log(error);
    }
}

initializeConnection();
