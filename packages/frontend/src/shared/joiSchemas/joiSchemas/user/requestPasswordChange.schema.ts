import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { emailValidation } from './const';

export const requestPasswordChange = Joi.object({
	email: emailValidation,
	password: Joi.string().optional(),
	confirmPassword: Joi.string().optional(),
});

export const requestPasswordChangeSchemaResolver = joiResolver(
	requestPasswordChange,
);
