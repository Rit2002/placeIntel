const userService = require('../services/user.service');
const { STATUS } = require('../utils/constants');
const AppError = require('../utils/errorbody');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        req.body.role = 'User'
        const response = await userService.registerUser(req.body);

        const token = jwt.sign(
            { email : response.email, role : response.role },
            process.env.JWT_AUTH,
            { expiresIn : '4h' }
        )

        return res.cookie('token', token, { maxAge : 240*60*1000 })
                .status(STATUS.CREATED)
                .json(successResponseBody(response, 'Successfully resgistered the user'));

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
    signup
}