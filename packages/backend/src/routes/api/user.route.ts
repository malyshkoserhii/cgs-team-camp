import { Router } from 'express';
import authController from '../../controllers/auth.controller';
import validate from '../../middlewares/validate';
import tryCatch from '../../middlewares/tryCatch';
import {
	userSchema,
	loginSchema,
	refreshTokenSchema,
} from '../../validators/userValidator';
import { authenticateJWT } from '../../middlewares/authMiddleware';

const userRouter: Router = Router();

userRouter.post(
	'/register',
	validate(userSchema),
	tryCatch(authController.register.bind(authController)),
);

userRouter.get(
	'/verify/:activationToken',
	authController.activate.bind(authController),
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

// Placeholder routes for future implementation
// userRouter.post(
// 	'/forgot-password',
// 	validate(userSchema),
// 	tryCatch(authController.forgotPassword.bind(authController)),
// );
// userRouter.post(
// 	'/reset-password',
// 	validate(userSchema),
// 	tryCatch(authController.resetPassword.bind(authController)),
// );
// userRouter.post(
// 	'/change-password',
// 	authenticateJWT,
// 	validate(userSchema),
// 	tryCatch(authController.changePassword.bind(authController)),
// );

export default userRouter;
