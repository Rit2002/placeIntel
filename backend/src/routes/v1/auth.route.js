const express = require('express');
const authRouter = express.Router();
const { createUserSchema, signInSchema } = require('../../schemas/user.schema');
const validateRequest = require('../../middlewares/auth.middleware');
const authController = require('../../controllers/auth.controller');

authRouter.post(
    '/auth/signup',
    validateRequest(createUserSchema),
    authController.signUp
);

authRouter.post(
    '/auth/signin',
    validateRequest(signInSchema),
    authController.signIn
)

module.exports = authRouter;