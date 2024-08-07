import * as Yup from 'yup';

export const initialValues = { name: '', email: '', password: '' };

export const RegisterSchema = Yup.object().shape({
	name: Yup.string().required('Required'),
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string()
		.min(6, 'Password should be at least 6 characters')
		.required('Required'),
});
