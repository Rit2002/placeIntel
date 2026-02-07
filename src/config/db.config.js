const mongoose = require('mongoose');

const main = async () => {

    await mongoose.connect(process.env.DB_URL);
    console.log("Successfully connected to MongoDB");

}

module.exports = main