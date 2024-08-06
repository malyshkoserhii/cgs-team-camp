import Joi from 'joi';

export const userSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
	name: Joi.string().required(),
});

export const resendVerificationSchema = Joi.object({
	email: Joi.string().email().required().messages({
		'string.email': 'Please provide a valid email address',
		'any.required': 'Email is required',
	}),
});

export const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

export const changePasswordSchema = Joi.object({
	newPassword: Joi.string().min(6).max(20).required(),
	oldPassword: Joi.string().required(),
});

export const forgotPasswordSchema = Joi.object({
	email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
	newPassword: Joi.string().min(6).max(20).required(),
	resetToken: Joi.string().required(),
});

export const refreshTokenSchema = Joi.object({
	refreshToken: Joi.string().required(),
});
