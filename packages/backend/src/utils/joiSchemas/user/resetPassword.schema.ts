import Joi from 'joi';
import { passwordValidation, tokenValidation } from './const';

export const resetPasswordSchema = Joi.object({
	password: passwordValidation,
	token: tokenValidation,
});
