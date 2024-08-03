import Joi from 'joi';

export const createTodoSchema = Joi.object({
	title: Joi.string().required(),
	description: Joi.string().required(),
	isCompleted: Joi.boolean().required(),
	isPrivate: Joi.boolean().required(),
});
export const UpdateTodoSchema = Joi.object({
	title: Joi.string(),
	description: Joi.string(),
	isCompleted: Joi.boolean(),
	isPrivate: Joi.boolean(),
});
