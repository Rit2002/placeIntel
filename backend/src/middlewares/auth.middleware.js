const { STATUS } = require("../utils/constants");
const { errorResponseBody } = require("../utils/responsebody");

const validateRequest = (schema, source = 'body') => {

    return (req, res, next) => {
        try {
            const parsedReq = schema.parse(req[source]);
            // overwriting the validated data or prased data
            req[source] = parsedReq;

            next();

        } catch (error) {            
            
            return res.status(STATUS.BAD_REQUEST).json(
                errorResponseBody(error.flatten().fieldErrors)
            );
        }
    };
}

module.exports = {
    validateRequest
};