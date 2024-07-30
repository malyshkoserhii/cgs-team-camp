import Joi from 'joi';
import { todoStatusValidation } from './const';

export const todoStatusUpdate = Joi.object({
	status: todoStatusValidation,
});
