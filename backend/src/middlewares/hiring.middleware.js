const { STATUS } = require('../utils/constants');
const { errorResponseBody } = require('../utils/responsebody');
const { z } = require('zod');

const validateRequest = (schema, source='body') => {

    return (req, res, next) => {
        try {
            const parsedReq = schema.parse(req[source]);

            req[source] = parsedReq;

            next();

        } catch (error) {
            
            if(error instanceof z.ZodError) {
                return res.status(STATUS.BAD_REQUEST).json(
                    errorResponseBody(z.treeifyError(error))
                );
            }

            next(error);
        }
    }
}

module.exports = {
    validateRequest
}