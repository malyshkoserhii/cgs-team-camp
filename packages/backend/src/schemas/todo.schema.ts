import Joi from 'joi';
import { joiErrorMessages } from '@/constants';

export const todoSchema = Joi.object()
	.keys({
		title: Joi.string()
			.required()
			.messages(joiErrorMessages.string('Title')),
		description: Joi.string()
			.required()
			.messages(joiErrorMessages.string('Description')),
		isPrivate: Joi.boolean()
			.required()
			.messages(joiErrorMessages.boolean('Private/Public')),
		isCompleted: Joi.boolean()
			.required()
			.messages(joiErrorMessages.boolean('Completed')),
	})
	.min(1)
	.messages(joiErrorMessages.objMin());
