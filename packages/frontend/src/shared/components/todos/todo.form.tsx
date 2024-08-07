import * as React from 'react';
import { useFormik } from 'formik';
import { TodoCreateType } from '../../../typings/todos.type';
import { useTodoStore } from '../../../store';

const TodoForm: React.FC = () => {
	const { addTodo } = useTodoStore();

	const formik = useFormik<TodoCreateType>({
		initialValues: {
			name: '',
			descr: '',
			status: 'ToDo',
			date: new Date(),
			dashboardId: 1, // Example value, replace it with your actual dashboardId
			userId: 1, // Example value, replace it with your actual userId
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
			<button type="submit">Add Todo</button>
		</form>
	);
};

export default TodoForm;
