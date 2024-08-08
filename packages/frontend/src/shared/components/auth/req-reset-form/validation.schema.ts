import * as Yup from 'yup';

export const reqResetSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required'),
});
