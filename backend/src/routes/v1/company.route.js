const express = require('express');
const companyRouter = express.Router();
const companyController = require('../../controllers/company.controller');
const { validateRequest } = require('../../middlewares/company.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');
const { companyCreateSchema, companyParamSchema, companyUpdateSchema } = require('../../schemas/company.schema');

companyRouter.post(
    '/company',
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminORTpo,
    validateRequest(companyCreateSchema),
    companyController.create
);

companyRouter.get(
    '/company/all',
    companyController.getAllCompanies
);

companyRouter.get(
    '/company/:id/details',
    validateRequest(companyParamSchema, 'params'),
    companyController.getCompany
);

companyRouter.delete(
    '/company/:id',
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminORTpo,
    validateRequest(companyParamSchema, 'params'),
    companyController.deleteCompany
);

companyRouter.patch(
    '/company/:id',
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminORTpo,
    validateRequest(companyUpdateSchema),
    validateRequest(companyParamSchema, 'params'),
    companyController.updateCompany
);


module.exports = companyRouter;