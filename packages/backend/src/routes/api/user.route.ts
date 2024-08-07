import authController from '@/controllers/auth.controller';
import tryCatch from '@/middlewares/tryCatch';
import validate from '@/middlewares/validate';
import {
	changePasswordSchema,
	forgotPasswordSchema,
	loginSchema,
	refreshTokenSchema,
	resetPasswordSchema,
	userSchema,
} from '../../validators/userValidator';
import { Router } from 'express';
import { authenticateJWT } from '@/middlewares/authMiddleware';

const userRouter: Router = Router();

userRouter.post(
	'/register',
	validate(userSchema),
	tryCatch(authController.register.bind(authController)),
);

userRouter.get(
	'/activate/:activationToken',
	tryCatch(authController.activate.bind(authController)),
);

userRouter.post(
	'/refresh-token',
	validate(refreshTokenSchema),
	tryCatch(authController.refreshToken.bind(authController)),
);

userRouter.post(
	'/login',
	validate(loginSchema),
	tryCatch(authController.login.bind(authController)),
);

userRouter.post(
	'/logout',
	authenticateJWT,
	validate(refreshTokenSchema),
	tryCatch(authController.logout.bind(authController)),
);

userRouter.get(
	'/profile',
	authenticateJWT,
	tryCatch(authController.getProfile.bind(authController)),
);

userRouter.post(
	'/forgot-password',
	validate(forgotPasswordSchema),
	tryCatch(authController.forgotPassword.bind(authController)),
);

userRouter.post(
	'/reset-password',
	validate(resetPasswordSchema),
	tryCatch(authController.resetPassword.bind(authController)),
);

userRouter.post(
	'/change-password',
	validate(changePasswordSchema),
	tryCatch(authController.changePassword.bind(authController)),
);

export default userRouter;
