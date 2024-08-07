import passport from 'passport';
import { Router } from 'express';

import userController from '../../controllers/user.controller';
import {
	tryCatch,
	validateRequestBody,
} from '../middlewares/utils.middlewares';
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
	tryCatch(userController.registerUser.bind(userController)),
);

userRouter.post(
	'/login',
	validateRequestBody(loginValidationBodySchema),
	tryCatch(userController.loginUser.bind(userController)),
);

userRouter.post(
	'/request-reset-password',
	validateRequestBody(reqResetPassValidationBodySchema),
	tryCatch(userController.reqPasswordReset.bind(userController)),
);

userRouter.post(
	'/reset-password',
	validateRequestBody(resetPassValidationBodySchema),
	tryCatch(userController.resetPassword.bind(userController)),
);

userRouter.get(
	'/activate',
	tryCatch(userController.activateAccount.bind(userController)),
);

export default userRouter;
