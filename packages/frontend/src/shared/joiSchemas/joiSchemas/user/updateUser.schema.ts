import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { usernameValidation } from './const';

export const updateUserNameSchema = Joi.object({
	name: usernameValidation,
});

export const updateUserNameSchemaResolver = joiResolver(updateUserNameSchema);
