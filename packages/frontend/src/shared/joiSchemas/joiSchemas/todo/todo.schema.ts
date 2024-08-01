import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import {
	todoDescriptionValidation,
	todoNameValidation,
	todoPrivateValidation,
	todoStatusValidation,
} from './const';

const todoSchema = Joi.object({
	name: todoNameValidation,
	description: todoDescriptionValidation,
	status: todoStatusValidation,
	isPrivate: todoPrivateValidation,
});

export const todoSchemaResolver = joiResolver(todoSchema);
