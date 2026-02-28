const express = require('express');
const authRouter = express.Router();
const { studentRegisterSchema, tpoRegisterSchema, signInSchema } = require('../../schemas/user.schema');
const authMiddleware = require('../../middlewares/auth.middleware');
const authController = require('../../controllers/auth.controller');

authRouter.post(
    '/auth/register/student',
    authMiddleware.validateRequest(studentRegisterSchema),
    authController.studentSignup
);

authRouter.post(
    '/auth/register/tpo',
    authMiddleware.validateRequest(tpoRegisterSchema),
    authController.tpoSignup
);

authRouter.post(
    '/auth/signin',
    authMiddleware.validateRequest(signInSchema),
    authController.signIn
);

module.exports = authRouter;