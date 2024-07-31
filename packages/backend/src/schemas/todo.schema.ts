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
	status: Joi.boolean(),
	id: Joi.number(),
	AuthorId: Joi.number(),
	private: Joi.boolean(),
});
