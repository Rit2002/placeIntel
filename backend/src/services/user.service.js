const User = require('../models/user.model');
const Student = require('../models/student.model');
const TPO = require('../models/tpo.model');
const { STATUS } = require('../utils/constants');
const AppError = require('../utils/errorbody');
const { redisClient } = require('../config/redis.config');
const jwt = require('jsonwebtoken');

const registerStudent = async (data) => {
    try {
        const exists = await User.findOne({ email : data.email });

        if(exists) {

            throw new AppError(
                STATUS.CONFLICT,
                'The student already exists!'
            );
        }

        const user = await User.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        });

        const student = await Student.create({
            userId: user.id,
            branch: data.branch,
            year: data.year
        });

        return student;

    } catch (error) {
        
        if(error.name == 'ValidationError') {
            let err = {};

            Object.keys(error.errors).forEach( key => {
                err[key] = error.errors[key].message;
            });

            throw new AppError(
                STATUS.UNPROCESSABLE_ENTITY,
                err
            );
        }

        throw error;
    }
}

const registerTPO = async (data) => {
    try {
        const exists = await User.findOne({ email : data.email });

        if(exists) {

            throw new AppError(
                STATUS.CONFLICT,
                'The TPO already exists!'
            )
        }

        const user = await User.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        });

        const tpo = await TPO.create({
            userId: user.id,
            department: data.department
        });

        return tpo;

    } catch (error) {
        
        if(error.name == 'ValidationError') {
            let err = {};

            Object.keys(error.errors).forEach( key => {
                err[key] = error.errors[key].message;
            });

            throw new AppError(
                STATUS.UNPROCESSABLE_ENTITY,
                err
            );
        }

        throw error;
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({email : email});

        if(!user) {
            throw new AppError(
                STATUS.UNAUTHORISED,
                'User NOT found for given email'
            )
        }

        return user;

    } catch (error) {
        console.log(error);

        throw error;        
    }
}

const logOut = async (token) => {
    try {
        const payload = jwt.decode(token);

        await redisClient.set(`token:${token}`, 'Blocked');
        await redisClient.expireAt(`token:${token}`, payload.exp);

        return 'Successfully logged out';

    } catch (error) {
        console.log(error);
        
        throw error;
    }
}

module.exports = {
    registerStudent,
    registerTPO,
    getUserByEmail,
    logOut
}