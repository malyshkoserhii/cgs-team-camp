import Joi from 'joi';
import {
	passwordValidationOptional,
	usernameValidationOptional,
} from './const';

export const updateUserSchema = Joi.object({
	name: usernameValidationOptional,
	password: passwordValidationOptional,
	oldPassword: Joi.string(),
}).or('name', 'password');
