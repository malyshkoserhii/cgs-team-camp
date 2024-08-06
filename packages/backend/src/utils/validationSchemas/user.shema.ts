import Joi from 'joi';

export const registerSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
	username: Joi.string().required(),
});

export const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

export const changePasswordSchema = Joi.object({
	oldPassword: Joi.string().required(),
	newPassword: Joi.string().required(),
});

export const fogrtPassworSchema = Joi.object({
	email: Joi.string().email().required(),
});

export const resetPAsswordSchema = Joi.object({
	newPassword: Joi.string().required(),
});
