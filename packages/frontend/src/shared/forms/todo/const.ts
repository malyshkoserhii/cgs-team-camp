import * as Yup from 'yup';

import { TodoStatus } from '~typings/todo';

export const TodoSchema = Yup.object().shape({
	name: Yup.string().required('Name is required'),
	description: Yup.string(),
	status: Yup.mixed().oneOf(Object.values(TodoStatus)),
	isPrivate: Yup.boolean(),
});
