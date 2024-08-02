import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { emailValidation, passwordValidation } from './const';

export const loginSchema = Joi.object({
	email: emailValidation,
	password: passwordValidation,
	name: Joi.string().optional(),
});

export const loginSchemaResolver = joiResolver(loginSchema);
