import Joi from 'joi';

const maxTitleLength = 100;
const maxDescriptionLength = 400;

export const todoSchema = Joi.object({
	title: Joi.string().trim().max(maxTitleLength).required(),
	description: Joi.string().trim().max(maxDescriptionLength).optional(),
	completed: Joi.boolean().required(),
	public: Joi.boolean().required(),
});
