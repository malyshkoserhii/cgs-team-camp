import Joi from 'joi';

export const idSchema = Joi.object({
	id: Joi.string().guid({ version: 'uuidv4' }).required(),
});

export const creatingSchema = Joi.object({
	title: Joi.string()
		.min(1)
		.max(12)
		.pattern(/^[a-zA-ZА-Яа-яЁё]*$/)
		.required(),
	text: Joi.string()
		.min(1)
		.max(200)
		.pattern(/^(?![\d+_@.-]+$)[a-zA-Z0-9.-]*$/)
		.required(),
	isPrivate: Joi.boolean().required(),
	isCompleted: Joi.boolean().required(),
});

export const updatingSchema = Joi.object({
	title: Joi.string()
		.min(1)
		.max(12)
		.pattern(/^[a-zA-ZА-Яа-яЁё]*$/)
		.optional(),
	isCompleted: Joi.boolean().optional(),
	text: Joi.string().optional(),
	isPrivate: Joi.boolean().optional(),
});
