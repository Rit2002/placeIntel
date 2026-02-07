const express = require('express');
const companyRoute = express.Router();
const companyController = require('../../controllers/company.controller');
const companyMiddleware = require('../../middlewares/company.middleware');

companyRoute.post(
    '/company',
    companyMiddleware.validateCompanyCreateRequest,
    companyController.create
);

module.exports = companyRoute;