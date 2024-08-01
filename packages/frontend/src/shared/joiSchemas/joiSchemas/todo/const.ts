import { TodoStatus } from '@prisma/client';
import Joi from 'joi';
import { ErrorMessages } from '~shared/const/errorMessages.const';

const name = 'Name';
const description = 'Description';
const minName = 1;
const maxName = 50;
const minDescription = 1;
const maxDescription = 500;

export const todoNameValidation = Joi.string()
	.min(minName)
	.max(maxName)
	.required()
	.messages({
		'string.base': ErrorMessages.ERROR,
		'string.empty': ErrorMessages.IS_REQUIRED(name),
		'string.min': ErrorMessages.AT_LEAST_LENGTH(minName, name),
		'string.max': ErrorMessages.AT_MOST_LENGTH(maxName, name),
		'any.required': ErrorMessages.IS_REQUIRED(name),
	});

export const todoDescriptionValidation = Joi.string()
	.trim()
	.min(minDescription)
	.max(maxDescription)
	.required()
	.messages({
		'string.base': ErrorMessages.ERROR,
		'string.empty': ErrorMessages.IS_REQUIRED(description),
		'string.min': ErrorMessages.AT_LEAST_LENGTH(
			minDescription,
			description,
		),
		'string.max': ErrorMessages.AT_MOST_LENGTH(maxDescription, description),
		'any.required': ErrorMessages.IS_REQUIRED(description),
	});

export const todoStatusValidation = Joi.string()
	.valid(...Object.values(TodoStatus))
	.messages({
		'string.base': ErrorMessages.ERROR,
		'any.only': ErrorMessages.ERROR,
		'any.required': ErrorMessages.IS_REQUIRED('Status'),
	});

export const todoPrivateValidation = Joi.boolean().optional().messages({
	'boolean.base': ErrorMessages.ERROR,
});
