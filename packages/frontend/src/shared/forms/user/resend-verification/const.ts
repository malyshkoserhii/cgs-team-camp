import * as Yup from 'yup';

export const initialValues = { email: '' };

export const ResendVerificationSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required'),
});
