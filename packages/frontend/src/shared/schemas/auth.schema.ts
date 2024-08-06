import Joi from 'joi';

export const UserRegisterSchema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
	email: Joi.string().required(),
});
export const UserLoginSchema = Joi.object({
	password: Joi.string().required(),
	email: Joi.string().required(),
});
