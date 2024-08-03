import authController from '@/controllers/auth.controller';
import { ctrlWrapper } from '@/helpers/ctrlWrapper';
import { localAuth } from '@/middlewars/auth/localAuth';
import { validateBody } from '@/middlewars/validateBody';
import { userLoginSchema, userRegisterSchema } from '@/schemas/user.schema';
import { Router } from 'express';

const authRouter: Router = Router();

authRouter.post(
	'/register',
	validateBody(userRegisterSchema),
	ctrlWrapper(authController.register.bind(authController)),
);
authRouter.post(
	'/login',
	validateBody(userLoginSchema),
	localAuth,
	ctrlWrapper(authController.login.bind(authController)),
);
export default authRouter;
