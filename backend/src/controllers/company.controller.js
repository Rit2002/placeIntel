const companyService = require('../services/company.service');
const { STATUS } = require('../utils/constants');
const { errorResponseBody, successResponseBody } = require('../utils/responsebody');

const create = async (req, res) => {
    try {
        const response = await companyService.createCompany(req.body);

        successResponseBody.data = response;
        successResponseBody.message = 'Successfully created a company';

        return res.status(STATUS.CREATED).json(successResponseBody);
        
    } catch (error) {
        
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }

        errorResponseBody.err = error;

        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

module.exports = {
    create
}