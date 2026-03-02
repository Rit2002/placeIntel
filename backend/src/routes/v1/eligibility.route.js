const express = require('express');
const eligibilityRouter = express.Router();
const eligibilityController = require('../../controllers/eligibility.controller');
const eligibilityMiddleware = require('../../middlewares/eligibility.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');

eligibilityRouter.post(
    '/eligibility',
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminORTpo,
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
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminORTpo,
    eligibilityController.updateEligibility
);

module.exports = eligibilityRouter;