const express = require('express');
const authRouter = express.Router();
const { createUserSchema, updateUserSchema } = require('../../schemas/user.schema');
const validateRequest = require('../../middlewares/auth.middleware');
const authController = require('../../controllers/auth.controller');

authRouter.post(
    '/auth/signup',
    validateRequest(createUserSchema),
    authController.signup
);

module.exports = authRouter;