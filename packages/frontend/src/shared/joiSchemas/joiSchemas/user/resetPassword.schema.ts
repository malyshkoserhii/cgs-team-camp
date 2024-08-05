import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { confirmPasswordValidation, passwordValidation } from './const';

export const resetPasswordSchema = Joi.object({
	password: passwordValidation,
	confirmPassword: confirmPasswordValidation,
});

export const resetPasswordSchemaResolver = joiResolver(resetPasswordSchema);
