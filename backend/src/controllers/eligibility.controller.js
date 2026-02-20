const eligibilityService = require('../services/eligibility.service');
const { STATUS } = require('../utils/constants');
const AppError = require('../utils/errorbody');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');


const create = async (req, res) => {
    try {
        const response = await eligibilityService.createEligibility(req.body);

        return res.status(STATUS.CREATED).json(
            successResponseBody(response, 'Successfully created the eligibility')
        );

    } catch (error) {
        
        if(error instanceof AppError) {
            return res.status(error.statusCode).json(
                errorResponseBody(error.details)
            );
        }

        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponseBody(error)
        );
    }
}

const getAllEligibility = async (req, res) => {
    try {
        const response = await eligibilityService.getAllEligibility(req.query);

        return res.status(STATUS.OK).json(
            successResponseBody(response, 'Fetched all the eligibilities')
        );

    } catch (error) {
        
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponseBody(error)
        );
    }
}

module.exports = {
    create,
    getAllEligibility
}