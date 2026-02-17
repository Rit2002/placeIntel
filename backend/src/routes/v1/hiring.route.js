const express = require('express');
const hiringRouter = express.Router();
const hiringController = require('../../controllers/hiring.controller');
const hiringMiddleware = require('../../middlewares/hiring.middleware');

hiringRouter.post(
    '/hiring',
    hiringMiddleware.validateHiringCreateRequest,
    hiringController.create
);

hiringRouter.get(
    '/hiring/all',
    hiringMiddleware.validateGetAllHiringRequest,
    hiringController.getAllHiring
);

hiringRouter.get(
    '/hiring/:id',
    hiringMiddleware.validateGetHiringRequest,
    hiringController.getHiring
);


module.exports = hiringRouter;