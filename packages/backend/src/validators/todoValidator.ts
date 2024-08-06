import Joi from 'joi';

export const todoSchema = Joi.object({
	title: Joi.string().required(),
	description: Joi.string().optional(),
	completed: Joi.boolean().required(),
	isPrivate: Joi.boolean().required(),
});
