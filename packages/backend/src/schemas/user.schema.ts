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
