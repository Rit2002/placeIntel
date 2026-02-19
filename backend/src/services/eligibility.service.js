const Eligibility = require('../models/eligibility.model');
const { STATUS } = require('../utils/constants');
const AppError = require('../utils/errorbody');


const createEligibility = async (data) => {
    try {
        const exist = await Eligibility.findOne(data);

        if(exist) {
            throw new AppError(
                STATUS.CONFLICT,
                'Eligibility info already present'
            );
        }

        const response = await Eligibility.create(data);

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

module.exports = {
    createEligibility
}