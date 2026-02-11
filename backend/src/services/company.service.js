const Company = require('../models/company.model');
const { STATUS } = require('../utils/constants');
const AppError = require('../utils/errorbody');

const createCompany = async (data) => {
    try {
        const existing = await Company.findOne({ name : data.name });

        if(existing) {
            throw new AppError(
                'Company already exist',
                STATUS.CONFLICT
            )
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

            throw new AppError(
                err,
                STATUS.UNPROCESSABLE_ENTITY
            )
        }

        throw error;
    }
}

const getCompanyById = async (companyId) => {
    try {
        const response = await Company.findById(companyId);

        if(!response) {
            throw new AppError(
                'No company found for given id',
                STATUS.NOT_FOUND
            )
        }

        return response;

    } catch (error) {

        throw error;       
    }
}

module.exports = {
    createCompany,
    getCompanyById
}