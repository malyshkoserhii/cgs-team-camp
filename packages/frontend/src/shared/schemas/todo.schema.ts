import Joi from 'joi';

export const AddTodoSchema = Joi.object({
	title: Joi.string().min(2).max(30).required(),
	description: Joi.string().max(256).required(),
	isCompleted: Joi.boolean().required(),
	isPrivate: Joi.boolean().required(),
});
export const UpdateTodoSchema = Joi.object({
	title: Joi.string().min(2).max(30),
	description: Joi.string().max(256),
	isCompleted: Joi.boolean(),
	isPrivate: Joi.boolean(),
});
