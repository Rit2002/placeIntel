const express = require('express');
const hiringRouter = express.Router();
const hiringController = require('../../controllers/hiring.controller');
const hiringMiddleware = require('../../middlewares/hiring.middleware');

hiringRouter.post(
    '/hiring',
    hiringMiddleware.validateHiringCreateRequest,
    hiringController.create
)

module.exports = hiringRouter;