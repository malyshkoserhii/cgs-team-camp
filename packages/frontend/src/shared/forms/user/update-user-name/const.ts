import * as Yup from 'yup';

export const UpdateNameSchema = Yup.object().shape({
	name: Yup.string().required('Required'),
});
