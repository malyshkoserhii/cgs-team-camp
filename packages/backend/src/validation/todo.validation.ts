import Joi from 'joi';
import { TodoStatus } from '@prisma/client';

export const createTodoSchema = Joi.object({
	name: Joi.string().min(3).max(32).required(),
	description: Joi.string().optional().allow(''),
	status: Joi.string()
		.valid(...Object.values(TodoStatus))
		.default('Todo'),
});

export const updateTodoSchema = Joi.object({
	name: Joi.string().optional(),
	description: Joi.string().optional(),
	status: Joi.string()
		.valid(...Object.values(TodoStatus))
		.optional(),
});
