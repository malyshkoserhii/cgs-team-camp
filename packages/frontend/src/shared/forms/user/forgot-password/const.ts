import * as Yup from 'yup';

export const initialValues = { email: '' };

export const ForgotPasswordSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required'),
});
