const jwt = require("jsonwebtoken");
const { STATUS, USER_ROLE } = require("../utils/constants");
const { errorResponseBody } = require("../utils/responsebody");
const User = require("../models/user.model");
const { redisClient } = require("../config/redis.config");

const validateRequest = (schema, source = 'body') => {

    return (req, res, next) => {
        try {
            const parsedReq = schema.parse(req[source]);
            // overwriting the validated data or prased data
            req[source] = parsedReq;

            next();

        } catch (error) {            
            
            return res.status(STATUS.BAD_REQUEST).json(
                errorResponseBody(error.flatten().fieldErrors)
            );
        }
    };
}

const isAuthinticated = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if(!token) {
            return res.status(STATUS.UNAUTHORISED).json(
                errorResponseBody('Authentication required')
            );
        }

        const payload = jwt.verify(token, process.env.JWT_AUTH);

        if(!payload?.id) {
            return res.status(STATUS.UNAUTHORISED).json(
                errorResponseBody('Invalid credentials')
            );
        }

        const user = await User.findById(payload.id);

        if(!user) {
            return res.status(STATUS.UNAUTHORISED).json(
                errorResponseBody('Invalid credentials')
            );
        }

        const isBlocked = await redisClient.exists(`token:${token}`);

        if(isBlocked) {
            return res.status(STATUS.UNAUTHORISED).json(
                errorResponseBody('Invalid credentials')
            )
        }

        req.user = user;

        next();

    } catch (error) {
        console.log(error);
        
        if(error.name == 'JsonWebTokenError') {
            return res.status(STATUS.UNAUTHORISED).json(
                errorResponseBody(error.message)
            );
        }

        if(error.name == 'TokenExpiredError') {
            return res.status(STATUS.UNAUTHORISED).json(
                errorResponseBody(error.message)
            );
        }

        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponseBody(error)
        );
    }
}

const isAdmin = (req, res, next) => {
    try {
        
        if(req.user.role != USER_ROLE.admin) {
            return res.status(STATUS.UNAUTHORISED).json(
                errorResponseBody('You are NOT Authorised')
            );
        }

        next();

    } catch (error) {
        console.log(error);        

    }
}

module.exports = {
    validateRequest,
    isAuthinticated,
    isAdmin
};