import { Router } from 'express';

import { genericValidatorMiddleware } from '@/middlewares';
import { localAuth } from '@/middlewares/auth.middleware';
import { userSchema } from '@/schemas/user.schema';
import { ctrLogin, ctrRegister } from '@/controllers/auth.controller';

const authRouter: Router = Router();

authRouter.post(
	'/register',
	genericValidatorMiddleware(userSchema),
	ctrRegister,
);

authRouter.post('/login', localAuth, ctrLogin);

export default authRouter;
