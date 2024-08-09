import * as yup from 'yup';

const minPasswordLength = 6;
const maxPasswordLength = 30;

export const changePasswordSchema = yup.object({
	oldPassword: yup
		.string()
		.trim()
		.min(minPasswordLength)
		.max(maxPasswordLength)
		.required(),
	newPassword: yup
		.string()
		.trim()
		.min(minPasswordLength)
		.max(maxPasswordLength)
		.required(),
});

export const resetPasswordSchema = yup.object({
	newPassword: yup
		.string()
		.trim()
		.min(minPasswordLength)
		.max(maxPasswordLength)
		.required(),
});

export const fogetPasswordSchema = yup.object({
	email: yup.string().trim().email().required(),
});
