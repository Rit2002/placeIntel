const hiringService = require('../services/hiring.service');
const { STATUS } = require('../utils/constants');
const AppError = require('../utils/errorbody');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');


const create = async (req, res) => {
    try {
        const response = await hiringService.createHiring(req.body);

        return res.status(STATUS.CREATED).json(
            successResponseBody(response, 'Successfully registered a hiring process')
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

const getHiring = async (req, res) => {
    try {
        const response = await hiringService.getHiringById(req.params.id);

        return res.status(STATUS.OK).json(
            successResponseBody(response, 'Successfully fetched the hiring details')
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

module.exports = {
    create,
    getHiring
}