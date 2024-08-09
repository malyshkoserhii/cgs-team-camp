import * as yup from 'yup';

const maxUsernameLength = 30;
const minPasswordLength = 6;
const maxPasswordLength = 30;

export const registerSchema = yup.object({
	username: yup.string().trim().max(maxUsernameLength).required(),
	email: yup.string().trim().email().required(),
	password: yup
		.string()
		.trim()
		.min(minPasswordLength)
		.max(maxPasswordLength)
		.required(),
});

export const loginSchema = yup.object({
	email: yup.string().trim().email().required(),
	password: yup
		.string()
		.trim()
		.min(minPasswordLength)
		.max(maxPasswordLength)
		.required(),
});
