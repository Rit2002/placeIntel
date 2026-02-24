const { STATUS } = require('../utils/constants');
const { errorResponseBody } = require('../utils/responsebody');
const objectId = require('mongoose').Types.ObjectId;

const validateCompanyCreateRequest = (req, res, next) => {

    if(!req.body.name) {

        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('No name field found')
        );
    }

    if(!req.body.description) {

        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('No description field found')
        );
    }

    if(!req.body.industryType) {

        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('No industryType field found')
        );
    }

    next();
}


const validateObjectId = (req, res, next) => {

    if(!objectId.isValid(req.params.id)) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('Invalid id')
        );
    }
}

module.exports = {
    validateCompanyCreateRequest,
    validateObjectId
}