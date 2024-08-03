import authController from '@/controllers/auth.controller';
import { ctrlWrapper } from '@/helpers/ctrlWrapper';
import { validateBody } from '@/middlewars/validateBody';
import { userRegisterSchema } from '@/schemas/user.schema';
import { Router } from 'express';

const authRouter: Router = Router();

authRouter.post(
	'/register',
	validateBody(userRegisterSchema),
	ctrlWrapper(authController.register.bind(authController)),
);
export default authRouter;
