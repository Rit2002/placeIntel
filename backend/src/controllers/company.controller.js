const companyService = require('../services/company.service');
const { STATUS } = require('../utils/constants');
const { errorResponseBody, successResponseBody } = require('../utils/responsebody');
const AppError = require('../utils/errorbody');

const create = async (req, res) => {
    try {
        const response = await companyService.createCompany(req.body);

        return res.status(STATUS.CREATED).json(
            successResponseBody(
                response, 
                'Successfully created a company'
            )
        );
        
    } catch (error) {
        console.log(error);
        
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

const getCompany = async (req, res) => {
    try {
        const response = await companyService.getCompanyById(req.params.id);

        return res.status(STATUS.OK).json(
            successResponseBody(
                response,
                'Successfully fetched the company'
            )
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

const getAllCompanies = async (req, res) => {
    try {
        const response = await companyService.getAllCompanies(req.query);

        return res.status(STATUS.OK).json(
            successResponseBody(response, 'Successfully fetched the companies')
        );

    } catch (error) {

        console.log(error);
        
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponseBody(error)
        );
    }
}

module.exports = {
    create,
    getCompany,
    getAllCompanies
}