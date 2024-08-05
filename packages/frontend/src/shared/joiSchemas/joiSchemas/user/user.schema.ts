import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import {
	emailValidation,
	passwordValidation,
	usernameValidation,
} from './const';

export const userSchema = Joi.object({
	name: usernameValidation,
	email: emailValidation,
	password: passwordValidation,
});

export const userSchemaResolver = joiResolver(userSchema);
