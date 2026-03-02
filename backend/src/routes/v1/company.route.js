const express = require('express');
const companyRouter = express.Router();
const companyController = require('../../controllers/company.controller');
const companyMiddleware = require('../../middlewares/company.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');

companyRouter.post(
    '/company',
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminORTpo,
    companyMiddleware.validateCompanyCreateRequest,
    companyController.create
);

companyRouter.get(
    '/company/all',
    companyController.getAllCompanies
);

companyRouter.get(
    '/company/:id',
    companyMiddleware.validateObjectId,
    companyController.getCompany
);

companyRouter.delete(
    '/company/:id',
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminORTpo,
    companyMiddleware.validateObjectId,
    companyController.deleteCompany
);

companyRouter.patch(
    '/company/:id',
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminORTpo,
    companyMiddleware.validateObjectId,
    companyController.updateCompany
);


module.exports = companyRouter;