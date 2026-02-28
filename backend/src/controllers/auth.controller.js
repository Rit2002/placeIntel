const userService = require('../services/user.service');
const { STATUS } = require('../utils/constants');
const AppError = require('../utils/errorbody');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');
const jwt = require('jsonwebtoken');

const studentSignup = async (req, res) => {
    try {
        req.body.role = 'Student';
        const response = await userService.registerStudent(req.body);

        const token = jwt.sign(
            { id : response.id, email : response.email, role : response.role },
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

const tpoSignup = async (req, res) => {
    try {
        req.body.role = 'TPO';
        const response = await userService.registerTPO(req.body);

        const token = jwt.sign(
            { id : response.id, email : response.email, role : response.role },
            process.env.JWT_AUTH,
            { expiresIn : '4h' }
        );

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

const signIn = async (req, res) => {
    try {
        const User = await userService.getUserByEmail(req.body.email);

        const isValidPassword = await User.isValidPassword(req.body.password);

        if(!isValidPassword) {
            throw new AppError(
                STATUS.UNAUTHORISED,
                'Invalid credentials'
            );
        }

        const token = jwt.sign(
            {id : User.id, email : User.email, role : User.role},
            process.env.JWT_AUTH,
            { expiresIn : '4h' }
        );

        let response = {
            firstName : User.firstName,
            lastName : User.lastName,
            email : User.email,
            role : User.role
        };

        return res
            .cookie('token', token, { maxAge : 240 * 60 * 1000})
            .status(STATUS.OK)
            .json(successResponseBody(response, 'Successfully logged in!'))

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
    studentSignup,
    tpoSignup,
    signIn
}