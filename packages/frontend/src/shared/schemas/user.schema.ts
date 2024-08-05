import Joi from 'joi';

export const ChangePasswordSchema = Joi.object({
	oldPassword: Joi.string().required(),
	newPassword: Joi.string().required(),
	confirmPassword: Joi.string()
		.valid(Joi.ref('newPassword'))
		.required()
		.messages({
			'any.only': 'confirmPassword must match newPassword',
		}),
});
export const UpdateUserSchema = Joi.object({
	username: Joi.string().required(),
});

export const ForgetPasswordSchema = Joi.object({
	email: Joi.string().required(),
});
export const resetPasswordSchema = Joi.object({
	newPassword: Joi.string().required(),
});
