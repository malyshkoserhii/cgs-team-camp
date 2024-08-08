import Joi from 'joi';

export const todoSchema = Joi.object({
	title: Joi.string().required(),
	description: Joi.string().allow('').optional(),
	completed: Joi.boolean().required(),
	public: Joi.boolean().required(),
	userId: Joi.number(),
	createdAt: Joi.date().optional(),
});
