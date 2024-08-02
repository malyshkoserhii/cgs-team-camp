import Joi from 'joi';

const minName = 2;
const maxName = 25;

export const usernameValidation = Joi.string()
	.alphanum()
	.min(minName)
	.max(maxName)
	.required();
export const emailValidation = Joi.string()
	.email({ tlds: { allow: false } })
	.required();
export const tokenValidation = Joi.string().required();
export const passwordValidation = Joi.string().min(6).required().messages({
	'string.min': 'Password must be at least 6 characters',
	'string.empty': 'Password is required',
});
export const confirmPasswordValidation = Joi.string()
	.valid(Joi.ref('password'))
	.required()
	.messages({
		'any.only': 'Passwords do not match',
		'string.empty': 'Please confirm your password',
	});
