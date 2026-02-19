const { errorResponseBody } = require("../utils/responsebody");
const { STATUS } = require("../utils/constants");
const objectId = require('mongoose').Types.ObjectId;

const validateEligibilityRequest = (req, res, next) => {

    // checking hiring id presence
    if(!req.body.hiringId) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('No hiring id found')
        );
    }

    // check if the hiring id is valid
    if(!objectId.isValid(req.body.hiringId)) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('Invalid hiring id')
        );
    }

    // checking academics presence
    if(!req.body.academics) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('No academics info found')
        );
    }

    // checking id academics is object or not
    if(!Object.prototype.toString.call(req.body.academics) === '[object Object]') {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('Invalid academics type')
        );
    }

    // checking minCgpa presence
    if(!req.body.academics.minCgpa) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('No minCgpa found')
        );
    }

    // checking maxBacklogs presence
    if(req.body.academics.maxBacklogs === undefined) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('No maxBacklogs found')
        );
    }

    // checking tenthPercent presence
    if(!req.body.academics.tenthPercent) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('No tenthPercent found')
        );
    }

    // checking twelthPercent presence
    if(!req.body.academics.twelthPercent) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('No twelthPercent found')
        );
    }

        // checking degreePercent presence
    if(!req.body.academics.degreePercent) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('No degreePercent found')
        );
    }

    // checking education presence
    if(!req.body.education) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('No education field found')
        );
    }

    // checking if the education field is object type or not
    if(!Object.prototype.toString.call(req.body.education) === '[object Object]') {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('Invalid education type')
        );
    }

    // checking allowedDegrees presence
    if(!req.body.education.allowedDegrees) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('No allowedDegrees found')
        );
    }

    // checking if allowedDegree is a array or not
    if(!req.body.education.allowedDegrees instanceof Array) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('Invalid format of allowedDegrees')
        );
    }

    // checking allowedBranch presence
    if(!req.body.education.allowedBranches) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('No allowedBranches found')
        );
    }

    // checking if allowedBranches is a array or not
    if(!req.body.education.allowedBranches instanceof Array) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('Invalid format of allowedBranches')
        );
    }

    next();
}

module.exports = {
    validateEligibilityRequest
}