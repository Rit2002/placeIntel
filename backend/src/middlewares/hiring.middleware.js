const { STATUS } = require('../utils/constants');
const { errorResponseBody } = require('../utils/responsebody');
const objectId = require('mongoose').Types.ObjectId;

const validateHiringCreateRequest = (req, res, next) => {

    // check the companyId present or not
    if(!req.body.companyId) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('No company id found')
        );
    }

    // check if the company id is valid
    if(!objectId.isValid(req.body.companyId)) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('Invalid company id')
        );
    }

    if(!req.body.roles || !(req.body.roles instanceof Array) || req.body.roles.length == 0) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('roles must not be empty')
        );
    }

    // checking if each hiring roles have all the required fields
    for(let i=0;i<req.body.roles.length;i++) {

        if(!req.body.roles[i].type) {
            return res.status(STATUS.BAD_REQUEST).json(
                errorResponseBody(`type of role not found`)
            );
        }

        if(!req.body.roles[i].ctc) {
            return res.status(STATUS.BAD_REQUEST).json(
                errorResponseBody(`CTC not found`)
            );
        }

        if(!req.body.roles[i].location) {
            return res.status(STATUS.BAD_REQUEST).json(
                errorResponseBody(`location not found`)
            );
        }

        if(!req.body.roles[i].title) {
            return res.status(STATUS.BAD_REQUEST).json(
                errorResponseBody(`Job title not found`)
            );
        }
    }

    // check for year of visit
    if(!req.body.year) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('Year of visit not present')
        );
    }

    // everyThing is right
    next();
}

const validateGetHiringRequest = (req, res, next) => {

    if(!req.params.id) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('No hiring id found')
        );
    }

    if(!objectId.isValid(req.params.id)) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('Invalid hiring id')
        );
    }

    // everything right
    next();
}

const validateGetAllHiringRequest = (req, res, next) => {

    if(req.body && req.body.year && !isNumber(req.body.year)) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('year type invalid')
        );
    }

    if(req.body && req.body.companyId && !objectId.isValid(req.body.companyId)) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('Invalid companyID')
        );
    }

    next();
}

module.exports = {
    validateHiringCreateRequest,
    validateGetHiringRequest,
    validateGetAllHiringRequest
}