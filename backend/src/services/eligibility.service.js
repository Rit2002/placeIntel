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

const getAllEligibility = async (query) => {

    try{
        let filter = {};
        
        page = parseInt(query.page);
        limit = parseInt(query.limit);

        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 10) limit = 10;

        limit = Math.min(limit, 50);
        
        // no of documents to skip 
        const skip = (page - 1) * limit;

        if (!isNaN(query.minCgpa)) {
            filter["academics.minCgpa"] = Number(query.minCgpa) ;
        }
        
        if (!isNaN(query.tenthPercent)) {
            filter["academics.tenthPercent"] =  Number(query.tenthPercent);
        }

        if (!isNaN(query.twelthPercent)) {
            filter["academics.twelthPercent"] = Number(query.twelthPercent);
        }

        if (!isNaN(query.degreePercent)) {
            filter["academics.degreePercent"] =  Number(query.degreePercent);
        }

        if (!isNaN(query.maxBacklogs)) {
            filter["academics.maxBacklogs"] =  Number(query.maxBacklogs);
        }

        if (!isNaN(query.branch)) {
            filter["education.allowedBranches"] = query.branch;
        }
        
        const [eligibility, total] = await Promise.all([

            Eligibility.find(filter)
                .sort({ createdAt : -1 }) // sorts the documents in descending order based on createdAt field
                .skip(skip)
                .limit(limit)
                .lean(),

            Eligibility.countDocuments(filter)
        ]);

        return {
            totalEligibilityCount : total,
            totalPages: Math.ceil(total / limit),
            eligibility : eligibility,
        };

    } catch (error) {
        console.log(error);

        throw error;        
    }
}


module.exports = {
    createEligibility,
    getAllEligibility
}