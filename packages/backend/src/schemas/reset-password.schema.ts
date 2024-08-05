import Joi from 'joi';

export const resetPasswordSchema = Joi.object({
	newPassword: Joi.string().min(6).max(25).required(),
	token: Joi.string().required(),
});
