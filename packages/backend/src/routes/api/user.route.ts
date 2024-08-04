import { Router } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

import authController from '@/controllers/auth.controller';
import { authenticateJWT } from '@/middlewares/auth.middleware';
import validate from '@/middlewares/validate';
import tryCatch from '@/middlewares/tryCatch';
import {
	registerSchema,
	loginSchema,
	changePasswordSchema,
	forgotPasswordSchema,
	resetPasswordSchema,
	refreshTokenSchema,
	resendVerificationSchema,
} from '@/validation/user.validation';
import { isExist } from '@/validation/isExist';

const router: Router = Router();

router.get(
	'/:id',
	authenticateJWT,
	isExist(Prisma.ModelName.User as keyof PrismaClient),
	tryCatch(authController.getUserById.bind(authController)),
);

router.post(
	'/register',
	validate(registerSchema),
	tryCatch(authController.register.bind(authController)),
);

router.get(
	'/verify-email/:token',
	tryCatch(authController.verifyEmail.bind(authController)),
);

router.post(
	'/resend-verification',
	validate(resendVerificationSchema),
	tryCatch(authController.resendVerificationEmail.bind(authController)),
);

router.post(
	'/login',
	validate(loginSchema),
	tryCatch(authController.login.bind(authController)),
);

router.post(
	'/logout',
	authenticateJWT,
	validate(refreshTokenSchema),
	tryCatch(authController.logout.bind(authController)),
);

router.post(
	'/refresh-token',
	validate(refreshTokenSchema),
	tryCatch(authController.refreshToken.bind(authController)),
);

router.post(
	'/change-password',
	authenticateJWT,
	validate(changePasswordSchema),
	tryCatch(authController.changePassword.bind(authController)),
);

router.post(
	'/forgot-password',
	validate(forgotPasswordSchema),
	tryCatch(authController.forgotPassword.bind(authController)),
);

router.post(
	'/reset-password',
	validate(resetPasswordSchema),
	tryCatch(authController.resetPassword.bind(authController)),
);

export default router;
