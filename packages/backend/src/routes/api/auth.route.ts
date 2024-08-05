import { Router } from 'express';
import { genericValidatorMiddleware } from '@/middlewares';
import { userSchema } from '@/schemas/user.schema';
import { ctrRegister } from '@/controllers/auth.controller';

const authRouter: Router = Router();

authRouter.post(
	'/register',
	genericValidatorMiddleware(userSchema),
	ctrRegister,
);

export default authRouter;
