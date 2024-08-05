import { Router } from 'express';

import { genericValidatorMiddleware } from '@/middlewares';
import { localAuth } from '@/middlewares/auth.middleware';
import { userSchema } from '@/schemas/user.schema';
import {
	ctrLogin,
	ctrRegister,
	ctrVerifyEmail,
} from '@/controllers/auth.controller';

const authRouter: Router = Router();

authRouter.post(
	'/register',
	genericValidatorMiddleware(userSchema),
	ctrRegister,
);

authRouter.post('/login', localAuth, ctrLogin);
authRouter.post('/verify-email/:token', ctrVerifyEmail);

export default authRouter;
