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
    eligibilityMiddleware.validateGetEligibilityRequest,
    eligibilityController.getAllEligibility
);

eligibilityRouter.get(
    '/eligibility/:id',
    eligibilityController.getEligibility
);

eligibilityRouter.patch(
    '/eligibility/:id',
    eligibilityController.updateEligibility
);

module.exports = eligibilityRouter;