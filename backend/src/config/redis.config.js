const { createClient } = require('redis');

const redisClient = createClient();

redisClient.on('error', err => console.log(`Redis Client Error : ${err}`));

const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Successfully connect to redis DB');
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {
    redisClient,
    connectRedis
}