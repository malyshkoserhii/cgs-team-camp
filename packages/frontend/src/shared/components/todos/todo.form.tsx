import * as React from 'react';
import { useFormik } from 'formik';
import { TodoCreateType } from '../../../typings/todos.type';
import { useTodoStore } from '../../../store';

interface TodoFormProps {
	dashboardId?: number;
}
const TodoForm: React.FC<TodoFormProps> = ({ dashboardId }) => {
	const { addTodo } = useTodoStore();

	const formik = useFormik<TodoCreateType>({
		initialValues: {
			name: '',
			descr: '',
			status: 'ToDo',
			date: new Date(),
			dashboardId: dashboardId,
			userId: 1,
		},
		onSubmit: (values) => {
			addTodo(values);
			formik.resetForm();
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<input
				type="text"
				name="name"
				value={formik.values.name}
				onChange={formik.handleChange}
				placeholder="Name"
			/>
			<textarea
				name="descr"
				value={formik.values.descr}
				onChange={formik.handleChange}
				placeholder="Description"
			/>
			<input
				type="text"
				name="userId"
				value={formik.values.userId}
				onChange={formik.handleChange}
				placeholder="userId"
			/>
			<button type="submit">Add Todo</button>
		</form>
	);
};

export default TodoForm;
