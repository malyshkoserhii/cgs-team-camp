import authController from '@/controllers/auth.controller';
import { ctrlWrapper } from '@/helpers/ctrlWrapper';
import { jwtAuth } from '@/middlewars/auth/jwtAuth';
import { localAuth } from '@/middlewars/auth/localAuth';
import { validateBody } from '@/middlewars/validateBody';
import {
	changePasswordSchema,
	newPasswordSchema,
	resetPasswordSchema,
	updateUserSchema,
	userLoginSchema,
	userRegisterSchema,
} from '@/schemas/user.schema';
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
authRouter.get(
	'/verify/:id',
	ctrlWrapper(authController.verifyEmail.bind(authController)),
);
authRouter.get(
	'/current-user',
	jwtAuth,
	ctrlWrapper(authController.getCurrentUser.bind(authController)),
);
authRouter.post(
	'/change-password',
	jwtAuth,
	validateBody(changePasswordSchema),
	ctrlWrapper(authController.changePassword.bind(authController)),
);
authRouter.put(
	'/update-user',
	jwtAuth,
	validateBody(updateUserSchema),
	ctrlWrapper(authController.updateUser.bind(authController)),
);
authRouter.post(
	'/forget-password',

	validateBody(resetPasswordSchema),
	ctrlWrapper(authController.forgetPassword.bind(authController)),
);
authRouter.post(
	'/reset-password/:id',

	validateBody(newPasswordSchema),
	ctrlWrapper(authController.resetPassword.bind(authController)),
);
export default authRouter;
