const Company = require('../models/company.model');
const { STATUS } = require('../utils/constants');
const AppError = require('../utils/errorbody');

const createCompany = async (data) => {
    try {
        const existing = await Company.findOne(data);

        if(existing) {
            throw new AppError(
                STATUS.CONFLICT,
                'Company already exist'
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
                STATUS.UNPROCESSABLE_ENTITY,
                err
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
                STATUS.NOT_FOUND,
                'No company found for given id'
            )
        }

        return response;

    } catch (error) {

        throw error;       
    }
}

const getAllCompanies = async (data) => {
    try {
        let { page = 1, limit = 10, name, industryType } = data; 

        let filter = {};

        // this is a page no.
        page = Math.max(1, parseInt(page));

        // Limits the no of companies per page in between 1 to 50
        limit = Math.min(50, Math.max(1, parseInt(limit)));
        
        // no of documents to skip 
        const skip = (page - 1) * limit;

        // search for the name even if it is partially provided
        // applies case-insensitive regex for partial name
        if(name) {
            filter.name = {$regex: name, $options: "i"};
        }

        if(industryType) {
            filter.industryType = industryType;
        }

        const companies = await Company.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt : -1 }); // sorts the documents in descending order based on createdAt field

        const total = await Company.countDocuments(filter);

        return {
            totalCompanies : total,
            totalPages: Math.ceil(total / limit),
            companies : companies,
        };
        
    } catch (error) {
        console.log(error);
        
        throw error;
    }
}

const deleteCompanyById = async (companyId) => {
    try {
        const response = await Company.findByIdAndDelete(companyId);

        if(!response) {
            throw new AppError(
                STATUS.NOT_FOUND,
                'No company found for given id'
            );
        }

        return response;

    } catch (error) {
        console.log(error);
        
        throw error;
    }
}

const updateCompanyDetails = async (companyId, data) => {
    try {
        const response = await Company.findByIdAndUpdate(companyId, data, {new : true, runValidators : true});

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

module.exports = {
    createCompany,
    getCompanyById,
    getAllCompanies,
    deleteCompanyById,
    updateCompanyDetails
}