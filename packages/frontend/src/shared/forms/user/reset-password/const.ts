import * as Yup from 'yup';

export const initialValues = { newPassword: '', confirmPassword: '' };

export const ResetPasswordSchema = Yup.object().shape({
	newPassword: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
		.required('Required'),
});
