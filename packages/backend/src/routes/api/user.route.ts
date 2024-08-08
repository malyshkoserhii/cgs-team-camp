import { Router } from 'express';
import userController from '@/controllers/user.controller';

const router = Router();

router.post('/register', userController.register.bind(userController));
router.post('/login', userController.login.bind(userController));
router.post(
	'/forgot-password',
	userController.forgotPassword.bind(userController),
);
router.post(
	'/reset-password',
	userController.resetUserPassword.bind(userController),
);

export default router;
