const { STATUS } = require('../utils/constants');
const { errorResponseBody } = require('../utils/responsebody');

const validateCompanyCreateRequest = (req, res, next) => {

    if(!req.body.name) {
        errorResponseBody.err = 'No name field found';
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    if(!req.body.description) {
        errorResponseBody.err = 'No description field found';
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // if(!req.body.industryType) {
    //     errorResponseBody.err = 'No industryType field found';
    //     return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    // }

    next();
}

module.exports = {
    validateCompanyCreateRequest
}