import Joi from 'joi';

export const todoFilterSchema = Joi.object({
	search: Joi.string().allow(''),
	status: Joi.string().valid('completed', 'active'),
	public: Joi.boolean(),
	page: Joi.number().integer().min(1),
	pageSize: Joi.number().integer().min(1).max(100),
}).options({ allowUnknown: true });
