import Joi from 'joi';

export const todoValidationBodySchema = Joi.object({
	title: Joi.string().min(4).max(20).required(),
	description: Joi.string().min(4).max(500).required(),
	private: Joi.boolean().required(),
	completed: Joi.boolean(),
});

