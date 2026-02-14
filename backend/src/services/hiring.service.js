const Hiring = require('../models/hiring.model');
const { STATUS } = require('../utils/constants');
const AppError = require('../utils/errorbody');

const createHiring= async (data) => {
    try {
        const response = await Hiring.create(data);
        
        return response;
        
    } catch (error) {
        console.log(error);
        
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

const getHiringById = async (hiringId) => {
    try {
        const response = await Hiring.findById(hiringId);

        if(!response) {
            throw new AppError(
                STATUS.NOT_FOUND,
                'No hiring found for given id'
            );
        }

        return response;

    } catch (error) {
        console.log(error);

        throw error;        
    }
}

module.exports = {
    createHiring,
    getHiringById
}