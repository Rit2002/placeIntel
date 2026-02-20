const express = require('express');
const eligibilityRouter = express.Router();
const eligibilityController = require('../../controllers/eligibility.controller');
const eligibilityMiddleware = require('../../middlewares/eligibility.middleware');

eligibilityRouter.post(
    '/eligibility',
    eligibilityMiddleware.validateEligibilityRequest,
    eligibilityController.create
);

eligibilityRouter.get(
    '/eligibility/all',
    eligibilityController.getAllEligibility
)

module.exports = eligibilityRouter;