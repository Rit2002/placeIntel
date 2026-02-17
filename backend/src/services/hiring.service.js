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

const getAllHiring = async (data, page=1, limit=10) => {
    try {

        let filter = {};

        page = parseInt(page);
        limit = parseInt(limit);

        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 10;

        limit = Math.min(limit, 50);
        
        // no of documents to skip 
        const skip = (page - 1) * limit;

        if(data && data.companyId) {
            filter.companyId = data.companyId;
        }

        if(data && data.year) {
            filter.year = data.year;
        }

        const hirings = await Hiring.find(filter)
        .populate('companyId', 'name')
        .sort({ createdAt : -1 }) // sorts the documents in descending order based on createdAt field
        .skip(skip)
        .limit(limit)

        const total = await Hiring.countDocuments(filter);

        return {
            totalHirings : total,
            totalPages: Math.ceil(total / limit),
            hirings : hirings,
        };

    } catch (error) {
        console.log(error);

        throw error;        
    }
}

module.exports = {
    createHiring,
    getHiringById,
    getAllHiring
}