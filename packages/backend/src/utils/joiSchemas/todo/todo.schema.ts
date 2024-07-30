import Joi from 'joi';
import {
	todoDescriptionValidation,
	todoNameValidation,
	todoPrivateValidation,
	todoStatusValidation,
} from './const';

export const todoSchema = Joi.object({
	name: todoNameValidation,
	description: todoDescriptionValidation,
	status: todoStatusValidation,
	isPrivate: todoPrivateValidation,
});
