import { Router } from 'express';
import { userController } from '@/controllers/user.controller';
import { authenticateJwt } from '@/middleware/auth.middleware';
import { validateBodyMiddleware } from '@/middleware/validateBody.middleware';
import { loginSchema } from '@/utils/joiSchemas/user/loginSchema';
import { requestPasswordChange } from '@/utils/joiSchemas/user/requestPasswordChange.schema';
import { resetPasswordSchema } from '@/utils/joiSchemas/user/resetPassword.schema';
import { userSchema } from '@/utils/joiSchemas/user/user.schema';

const router: Router = Router();

router.post(
	'/register',
	validateBodyMiddleware(userSchema),
	userController.register.bind(userController),
);
router.post(
	'/login',
	validateBodyMiddleware(loginSchema),
	userController.login.bind(userController),
);
router.post('/refresh', authenticateJwt, userController.refresh);
router.post('/logout', authenticateJwt, userController.logout);
router.get('/activate/:id', userController.registerConfirmation);
router.post(
	'/request-password-reset',
	validateBodyMiddleware(requestPasswordChange),
	userController.requestPasswordReset.bind(userController),
);
router.post(
	'/reset-password',
	validateBodyMiddleware(resetPasswordSchema),
	userController.resetPassword.bind(userController),
);
router.get(
	'/current',
	authenticateJwt,
	userController.currentUser.bind(userController),
);

export default router;
