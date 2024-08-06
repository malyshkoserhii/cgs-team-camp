import * as yup from 'yup';

const maxTitleLength = 100;
const maxDescriptionLength = 400;

export const createTodoSchema = yup.object({
	title: yup.string().trim().max(maxTitleLength).required(),
	description: yup.string().trim().max(maxDescriptionLength).required(),
	completed: yup.boolean().required(),
	public: yup.boolean().required(),
});

export const upadteTodoSchema = yup.object().shape({
	title: yup.string().trim().max(maxTitleLength).required(),
	description: yup.string().trim().max(maxDescriptionLength).optional(),
	completed: yup.boolean(),
	public: yup.boolean(),
});
