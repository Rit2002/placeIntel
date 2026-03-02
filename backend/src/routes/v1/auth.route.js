const express = require('express');
const authRouter = express.Router();
const { studentRegisterSchema, tpoRegisterSchema, signInSchema, resetPasswordSchema } = require('../../schemas/user.schema');
const authMiddleware = require('../../middlewares/auth.middleware');
const authController = require('../../controllers/auth.controller');

authRouter.post(
    '/auth/register/student',
    authMiddleware.validateRequest(studentRegisterSchema),
    authController.studentSignup
);

authRouter.post(
    '/auth/register/tpo',
    authMiddleware.isAuthenticated,
    authMiddleware.isAdmin,
    authMiddleware.validateRequest(tpoRegisterSchema),
    authController.tpoSignup
);

authRouter.post(
    '/auth/login',
    authMiddleware.validateRequest(signInSchema),
    authController.logIn
);

authRouter.post(
    '/auth/logout',
    authMiddleware.isAuthenticated,
    authController.logOut
);

authRouter.patch(
    '/auth/reset',
    authMiddleware.isAuthenticated,
    authController.reset
)

authRouter.post(
    '/auth/forgot-password',
    authController.forgotPassword
);

authRouter.post(
    '/auth/reset-password/:token',
    authMiddleware.validateResetPasswordRequest,
    authMiddleware.validateRequest(resetPasswordSchema),
    authController.resetPassword
);

module.exports = authRouter;