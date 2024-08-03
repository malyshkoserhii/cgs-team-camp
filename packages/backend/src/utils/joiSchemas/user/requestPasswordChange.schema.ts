import Joi from 'joi';
import { emailValidation } from './const';

export const requestPasswordChange = Joi.object({
	email: emailValidation,
});
