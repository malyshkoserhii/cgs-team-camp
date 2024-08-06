import Joi from 'joi';

export const todoValidationBodySchema = Joi.object({
	title: Joi.string().min(4).max(20).required(),
	description: Joi.string().min(4).max(500).required(),
	private: Joi.boolean().default(false),
	completed: Joi.boolean().default(false),
});

export const regValidationBodySchema = Joi.object({
	email: Joi.string().email().required(),
	name: Joi.string().min(4).max(20).required(),
	password: Joi.string().min(4).max(20).required(),
});
export const loginValidationBodySchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(4).max(20).required(),
});

export const resetPassValidationBodySchema = Joi.object({
	userId: Joi.number().required(),
	token: Joi.string().required(),
	password: Joi.string().required(),
});

export const reqResetPassValidationBodySchema = Joi.object({
	email: Joi.string().email().required(),
});
