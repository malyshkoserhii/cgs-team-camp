import Joi from 'joi';

export const userRegisterSchema = Joi.object({
	username: Joi.string().required(),
	email: Joi.string().required(),
	password: Joi.string().required(),
});
export const userLoginSchema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().required(),
});
export const changePasswordSchema = Joi.object({
	newPassword: Joi.string().required(),
	oldPassword: Joi.string().required(),
});
export const updateUserSchema = Joi.object({
	username: Joi.string().required(),
});
export const resetPasswordSchema = Joi.object({
	email: Joi.string().required(),
});
export const newPasswordSchema = Joi.object({
	newPassword: Joi.string().required(),
});
