import { Router } from 'express';

import { genericValidatorMiddleware } from '@/middlewares';
import { localAuth } from '@/middlewares/auth.middleware';
import {
	forgotPasswordSchema,
	resetPasswordSchema,
	userSchema,
} from '@/schemas/user.schema';
import {
	ctrForgotPassword,
	ctrLogin,
	ctrRegister,
	ctrResetPassword,
	ctrVerifyEmail,
} from '@/controllers/auth.controller';

const authRouter: Router = Router();

authRouter.post(
	'/register',
	genericValidatorMiddleware(userSchema),
	ctrRegister,
);
authRouter.post('/verify-email/:token', ctrVerifyEmail);

authRouter.post('/login', localAuth, ctrLogin);
authRouter.post(
	'/forgot-password',
	genericValidatorMiddleware(forgotPasswordSchema),
	ctrForgotPassword,
);
authRouter.post(
	'/reset-password/:token',
	genericValidatorMiddleware(resetPasswordSchema),
	ctrResetPassword,
);

export default authRouter;
