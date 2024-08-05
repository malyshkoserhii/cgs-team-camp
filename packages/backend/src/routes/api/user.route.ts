import { Router } from 'express';
import authController from '../../controllers/auth.controller';
import validate from '../../middlewares/validate';
import tryCatch from '../../middlewares/tryCatch';
import { userSchema } from '../../validators/userValidator';

const userRouter: Router = Router();

// @route   POST api/user/register
// @desc    Register user given their email and password, returns the user upon successful registration
// @access  Public
userRouter.post(
	'/register',
	validate(userSchema),
	tryCatch(authController.register.bind(authController)),
);

// userRouter.post('/login', validate(userSchema), tryCatch(register));
// userRouter.post('/forgot-password', validate(userSchema), tryCatch(register));
// userRouter.post('/reset-password', validate(userSchema), tryCatch(register));

export default userRouter;
