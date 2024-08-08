import * as Yup from 'yup';

export const userValidationSchema = Yup.object({
	username: Yup.string(),
	password: Yup.string(),
	email: Yup.string().email(),
});
