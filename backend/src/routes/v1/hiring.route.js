const express = require('express');
const hiringRouter = express.Router();
const hiringController = require('../../controllers/hiring.controller');
const hiringMiddleware = require('../../middlewares/hiring.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');

hiringRouter.post(
    '/hiring',
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminORTpo,
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

hiringRouter.patch(
    '/hiring/:id',
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminORTpo,
    hiringMiddleware.validateObjectId,
    hiringController.updateHiring
);

hiringRouter.delete(
    '/hiring/:id',
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminORTpo,
    hiringMiddleware.validateObjectId,
    hiringController.deleteHiring
);


module.exports = hiringRouter;