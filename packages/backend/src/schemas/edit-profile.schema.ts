import Joi from 'joi';

export const editProfileSchema = Joi.object({
	name: Joi.string().alphanum().required(),
});
