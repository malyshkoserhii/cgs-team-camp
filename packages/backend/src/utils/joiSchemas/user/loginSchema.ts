import Joi from 'joi';
import { emailValidation, passwordValidation } from './const';

export const loginSchema = Joi.object({
	email: emailValidation,
	password: passwordValidation,
});
