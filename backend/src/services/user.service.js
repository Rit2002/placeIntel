const User = require('../models/user.model');
const { STATUS } = require('../utils/constants');
const AppError = require('../utils/errorbody');

const registerUser = async (data) => {
    try {
        const exists = await User.findOne({ email : data.email });

        if(exists) {

            throw new AppError(
                STATUS.CONFLICT,
                'The user already exists!'
            )
        }

        const response = await User.create(data);

        return response;

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

module.exports = {
    registerUser,
    getUserByEmail
}