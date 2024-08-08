import Joi from 'joi';

export const todoFilterSchema = Joi.object({
	search: Joi.string().allow(''),
	status: Joi.string().valid('completed', 'active'),
	public: Joi.boolean(),
}).options({ allowUnknown: true });
