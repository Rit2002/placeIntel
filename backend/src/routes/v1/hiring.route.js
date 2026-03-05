const express = require('express');
const hiringRouter = express.Router();
const hiringController = require('../../controllers/hiring.controller');
const { validateRequest } = require('../../middlewares/hiring.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');
const { hiringCreateSchema, hiringDeleteSchema, hiringParamSchema, hiringUpdateSchema } = require('../../schemas/hiring.schema');

hiringRouter.post(
    '/hiring',
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminORTpo,
    validateRequest(hiringCreateSchema),
    hiringController.create
);

hiringRouter.put(
    '/hiring/:id',
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminORTpo,
    validateRequest(hiringParamSchema, 'params'),
    validateRequest(hiringUpdateSchema),
    hiringController.updateHiring
);

hiringRouter.delete(
    '/hiring/:id',
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminORTpo,
    validateRequest(hiringDeleteSchema, 'params'),
    hiringController.deleteHiring
);


module.exports = hiringRouter;