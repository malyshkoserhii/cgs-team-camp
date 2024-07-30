import { TodoStatus } from '@prisma/client';
import Joi from 'joi';

const minName = 1;
const maxName = 50;
const minDescription = 1;
const maxDescription = 500;

export const todoNameValidation = Joi.string()
	.trim()
	.min(minName)
	.max(maxName)
	.required();
export const todoDescriptionValidation = Joi.string()
	.trim()
	.min(minDescription)
	.max(maxDescription)
	.required();
export const todoStatusValidation = Joi.string().valid(
	...Object.values(TodoStatus),
);
export const todoPrivateValidation = Joi.boolean().optional();
