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
    '/company/:id',
    companyController.getCompany
)

module.exports = companyRouter;