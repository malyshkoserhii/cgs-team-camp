import Joi from 'joi';

export const registerSchema = Joi.object({
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
	oldPassword: Joi.string().required(),
	newPassword: Joi.string().min(6).required(),
});

export const forgotPasswordSchema = Joi.object({
	email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
	resetToken: Joi.string().required(),
	newPassword: Joi.string().min(6).required(),
});

export const refreshTokenSchema = Joi.object({
	refreshToken: Joi.string().required(),
});

export const updateNameSchema = Joi.object({
	name: Joi.string().required().min(2).max(50),
});
