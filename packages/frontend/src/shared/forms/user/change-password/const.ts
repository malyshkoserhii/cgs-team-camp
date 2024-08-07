import * as Yup from 'yup';

export const initialValues = {
	oldPassword: '',
	newPassword: '',
	confirmNewPassword: '',
};

export const ChangePasswordSchema = Yup.object().shape({
	oldPassword: Yup.string().required('Required'),
	newPassword: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Required'),
	confirmNewPassword: Yup.string()
		.oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
		.required('Required'),
});
