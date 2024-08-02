import Joi from 'joi';

const minName = 2;
const maxName = 25;

export const usernameValidation = Joi.string()
	.alphanum()
	.min(minName)
	.max(maxName)
	.required();
export const emailValidation = Joi.string().email().required();
export const tokenValidation = Joi.string().required();
export const passwordValidation = Joi.string().min(6).max(50).required();
