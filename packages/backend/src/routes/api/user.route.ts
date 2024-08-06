import passport from 'passport';
import { Router } from 'express';

import userController from '../../controllers/user.controller';
import {
	isExist,
	tryCatch,
	validateRequestBody,
} from '../middlewares/utils.middlewares';
import UserService from '../../services/user.service';
import {
	loginValidationBodySchema,
	regValidationBodySchema,
	reqResetPassValidationBodySchema,
	resetPassValidationBodySchema,
} from '../middlewares/validation.schemas';

const userRouter: Router = Router();

userRouter.get(
	'',
	passport.authenticate('jwt', { session: false }),
	tryCatch(userController.getUser.bind(userController)),
);

userRouter.post(
	'/register',
	validateRequestBody(regValidationBodySchema),
	isExist(UserService),
	tryCatch(userController.registerUser.bind(userController)),
);

userRouter.post(
	'/login',
	isExist(UserService),
	validateRequestBody(loginValidationBodySchema),
	tryCatch(userController.loginUser.bind(userController)),
);

userRouter.post(
	'/request-reset-password',
	isExist(UserService),
	validateRequestBody(reqResetPassValidationBodySchema),
	tryCatch(userController.reqPasswordReset.bind(userController)),
);

userRouter.post(
	'/reset-password',
	isExist(UserService),
	validateRequestBody(resetPassValidationBodySchema),
	tryCatch(userController.resetPassword.bind(userController)),
);

userRouter.get(
	'/activate',
	tryCatch(userController.activateAccount.bind(userController)),
);

export default userRouter;
