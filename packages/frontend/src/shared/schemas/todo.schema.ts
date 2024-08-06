import * as Yup from 'yup';

export const todoValidationSchema = Yup.object({
	title: Yup.string().required('Title is required'),
	description: Yup.string().required('Description is required'),
	isCompleted: Yup.boolean(),
	isPrivate: Yup.boolean(),
});
