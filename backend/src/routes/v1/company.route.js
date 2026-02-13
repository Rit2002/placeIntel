const express = require('express');
const companyRouter = express.Router();
const companyController = require('../../controllers/company.controller');
const companyMiddleware = require('../../middlewares/company.middleware');

companyRouter.post(
    '/company',
    companyMiddleware.validateCompanyCreateRequest,
    companyController.create
);

companyRouter.get(
    '/company/all',
    companyController.getAllCompanies
);

companyRouter.get(
    '/company/:id',
    companyController.getCompany
);

companyRouter.delete(
    '/company/:id',
    companyController.deleteCompany
);

companyRouter.put(
    '/company/:id',
    companyController.updateCompany
);

companyRouter.patch(
    '/company/:id',
    companyController.updateCompany
);


module.exports = companyRouter;