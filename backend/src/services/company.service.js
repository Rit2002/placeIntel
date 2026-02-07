const Company = require('../models/company.model');
const { STATUS } = require('../utils/constants');

const createCompany = async (data) => {
    try {
        const existing = await Company.findOne({ name : data.name });

        if(existing) {
            throw {
                err : 'Company already exist',
                code : STATUS.CONFLICT
            }
        }

        const company = await Company.create(data);
        return company;

    } catch (error) {
        console.log(error);
        
        if(error.name == 'ValidationError') {
            let err = {};

            Object.keys(error.errors).forEach( key => {
                err[key] = error.errors[key].message;
            });

            throw {
                err : err,
                code : STATUS.UNPROCESSABLE_ENTITY
            }
        }

        throw error;
    }
}

module.exports = {
    createCompany
}