import Joi from 'joi';
import { TodoStatus } from '@prisma/client';

export const getTodosQuerySchema = Joi.object({
	search: Joi.string().optional(),
	isPrivate: Joi.boolean().optional(),
	status: Joi.string()
		.valid(...Object.values(TodoStatus))
		.optional(),
});

export const createTodoSchema = Joi.object({
	name: Joi.string().min(3).max(32).required(),
	description: Joi.string().optional().allow(''),
	status: Joi.string()
		.valid(...Object.values(TodoStatus))
		.default('Todo'),
	isPrivate: Joi.boolean().default(false),
});

export const updateTodoSchema = Joi.object({
	id: Joi.string().optional(),
	name: Joi.string().optional(),
	description: Joi.string().allow(''),
	status: Joi.string()
		.valid(...Object.values(TodoStatus))
		.optional(),
	isPrivate: Joi.boolean().optional(),
	createdAt: Joi.date().optional(),
	updatedAt: Joi.date().optional(),
});
