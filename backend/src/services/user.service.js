const User = require('../models/user.model');
const Student = require('../models/student.model');
const TPO = require('../models/tpo.model');
const { STATUS } = require('../utils/constants');
const AppError = require('../utils/errorbody');
const { redisClient } = require('../config/redis.config');
const jwt = require('jsonwebtoken');
const { generatePasswordResetToken } = require('../utils/token');
const sendMail = require('../services/email.service');

const registerStudent = async (data) => {
    try {
        const exists = await User.findOne({ email : data.email });

        if(exists) {

            throw new AppError(
                STATUS.CONFLICT,
                'The student already exists!'
            );
        }

        const user = await User.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        });

        const student = await Student.create({
            userId: user.id,
            branch: data.branch,
            year: data.year
        });

        return student;

    } catch (error) {
        
        if(error.name == 'ValidationError') {
            let err = {};

            Object.keys(error.errors).forEach( key => {
                err[key] = error.errors[key].message;
            });

            throw new AppError(
                STATUS.UNPROCESSABLE_ENTITY,
                err
            );
        }

        throw error;
    }
}

const registerTPO = async (data) => {
    try {
        const exists = await User.findOne({ email : data.email });

        if(exists) {

            throw new AppError(
                STATUS.CONFLICT,
                'The TPO already exists!'
            )
        }

        const user = await User.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            role: data.role
        });

        const tpo = await TPO.create({
            userId: user.id,
            department: data.department
        });

        return tpo;

    } catch (error) {
        
        if(error.name == 'ValidationError') {
            let err = {};

            Object.keys(error.errors).forEach( key => {
                err[key] = error.errors[key].message;
            });

            throw new AppError(
                STATUS.UNPROCESSABLE_ENTITY,
                err
            );
        }

        throw error;
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({email : email});

        if(!user) {
            throw new AppError(
                STATUS.UNAUTHORISED,
                'User NOT found for given email'
            )
        }

        return user;

    } catch (error) {
        console.log(error);

        throw error;        
    }
}

const logOut = async (token) => {
    try {
        const payload = jwt.decode(token);

        await redisClient.set(`token:${token}`, 'Blocked');
        await redisClient.expireAt(`token:${token}`, payload.exp);

        return 'Successfully logged out';

    } catch (error) {
        console.log(error);
        
        throw error;
    }
}

const getPasswordResetLink = async (email) => {
    try {
        const user = await User.findOne({ email });

        if(!user) {
            return;
        }

       const { resetToken, hashedToken } = generatePasswordResetToken();

       await redisClient.set(`resetToken:${hashedToken}`, user._id.toString());
       await redisClient.expire(`resetToken:${hashedToken}`, 600);

       const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        const response = sendMail(
            user.email,
            "Password Reset Request",
            `Hello,

            We received a request to reset your password for your account.

            If you made this request, please click the link below to set a new password:

            ${resetURL}

            This link will expire in 10 minutes for security reasons.

            If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.

            For security reasons, please do not share this link with anyone.

            If you need assistance, contact our support team.

            Thank you.`
        );

        console.log(response);
        
        return "If an account exists, a reset link has been sent.";

    } catch (error) {
        console.log(error);
        
        throw error;
    }
}

const resetPassword = async (userId, newPassword, hashedToken) => {
    try {
        // fetch the document
        const user = await User.findById(userId);

        if(!user) {
            throw new AppError(
                STATUS.NOT_FOUND,
                'User NOT found'
            );
        }

        // update the password
        user.password = newPassword;
        user.tokenVersion += 1;
        // hash & save the password
        await user.save();

        // delete the token after updating the password from redis
        await redisClient.del(`resetToken:${hashedToken}`);

        const response = sendMail(
            user.email,
            "Your Password Has Been Successfully Reset",
            `Hello,

            This is a confirmation that your account password has been successfully changed.

            If you made this change, no further action is required.

            If you did not reset your password, please contact our support team immediately, as your account may be at risk.

            For security reasons, we recommend reviewing your recent account activity and ensuring your password is strong and unique.

            Thank you.`
        );

        console.log(response.message);        

        return "Successfully reseted the password";

    } catch (error) {
        console.log(error);
        
        throw error;
    }
}

module.exports = {
    registerStudent,
    registerTPO,
    getUserByEmail,
    logOut,
    getPasswordResetLink,
    resetPassword
}