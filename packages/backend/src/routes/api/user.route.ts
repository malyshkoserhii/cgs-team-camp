import authController from '@/controllers/auth.controller';
import { jwtAuth, localAuth } from '@/middleware/auth.middleware';
import { tryCatchWrapper } from '@/middleware/tryCatch.middleware';
import { validateBody } from '@/middleware/validation.middleware';
import {
	changePasswordSchema,
	fogrtPassworSchema,
	loginSchema,
	registerSchema,
	resetPAsswordSchema,
} from '@/utils/validationSchemas/user.shema';
import { Router } from 'express';

const router: Router = Router();

router.post(
	'/register',
	validateBody(registerSchema),
	tryCatchWrapper(authController.register.bind(authController)),
);

router.post(
	'/login',
	validateBody(loginSchema),
	localAuth,
	tryCatchWrapper(authController.login.bind(authController)),
);

router.get(
	'/current',
	jwtAuth,
	tryCatchWrapper(authController.getCurrentUser.bind(authController)),
);

router.get(
	'/verify/:token',
	tryCatchWrapper(authController.verifyEmail.bind(authController)),
);

router.patch(
	'/change-password',
	jwtAuth,
	validateBody(changePasswordSchema),
	tryCatchWrapper(authController.changePassword.bind(authController)),
);

router.post(
	'/foget-password',
	validateBody(fogrtPassworSchema),
	tryCatchWrapper(authController.fogetPassword.bind(authController)),
);

router.post(
	'/reset-password/:id',
	validateBody(resetPAsswordSchema),
	tryCatchWrapper(authController.resetPassword.bind(authController)),
);

export default router;
