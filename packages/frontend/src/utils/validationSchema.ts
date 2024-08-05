import Joi from 'joi';

export const createTodoSchema = Joi.object({
	title: Joi.string().min(1).required().messages({
		'string.empty': 'Title is required',
		'string.min': 'Title must be at least 6 character long',
	}),
	description: Joi.string().optional(),
	completed: Joi.boolean().optional(),
});

export const updateTodoSchema = Joi.object({
	title: Joi.string().min(1).required().messages({
		'string.empty': 'Title is required',
		'string.min': 'Title must be at least 6 character long',
	}),
	description: Joi.string().optional(),
	completed: Joi.boolean().optional(),
});
