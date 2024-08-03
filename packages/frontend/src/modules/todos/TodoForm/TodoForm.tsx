import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

import { useTodoStore } from '~store/todo.store';
import { Todo } from '~typings/todo.types';
import { ROUTER_KEYS } from '~shared/keys';
import Button from '~shared/components/button/button.component';
import { Loader } from '~shared/components';
import {
	container,
	filedGroupWrapper,
	formStyle,
	inputStyle,
} from '~modules/todos/TodoForm/TodoForm.styles';
import { buttonGroupStyle } from '~modules/todos/TodoItem/TodoItem.styles';

export const TodoForm: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { getTodoById, updateTodo, createTodo, todo, loading } =
		useTodoStore();
	const isEdit = Boolean(id);

	React.useEffect(() => {
		if (isEdit) {
			getTodoById(id);
		}
	}, [isEdit, getTodoById]);

	const initialValues: Todo = {
		title: todo?.title || '',
		description: todo?.description || '',
		isCompleted: todo?.isCompleted || false,
		isPrivate: todo?.isPrivate || false,
	};

	const handleSubmit = async (
		values: Todo,
		{ resetForm }: { resetForm: () => void },
	): Promise<void> => {
		if (isEdit && id) {
			await updateTodo(id, values);
			resetForm();
		} else {
			await createTodo(values);
			resetForm();
		}
		navigate(ROUTER_KEYS.DASHBOARD);
	};

	if (loading) {
		return <Loader loading={loading} />;
	}

	return (
		<>
			<div className={container}>
				<h2>{isEdit ? 'Edit Todo' : 'Create Todo'}</h2>
				<Formik initialValues={initialValues} onSubmit={handleSubmit}>
					<Form className={formStyle}>
						<div className={filedGroupWrapper}>
							<label htmlFor="title">Title</label>
							<Field
								id="title"
								name="title"
								className={inputStyle}
							/>
						</div>
						<div className={filedGroupWrapper}>
							<label htmlFor="description">Description</label>
							<Field
								as="textarea"
								id="description"
								name="description"
								className={inputStyle}
							/>
						</div>
						<label htmlFor="isPrivate">
							<Field type="checkbox" name="isPrivate" />
							Private
						</label>

						<label>
							<Field type="checkbox" name="isCompleted" />
							Completed
						</label>
						<div className={buttonGroupStyle}>
							<Button
								text={isEdit ? 'Update' : 'Create'}
								type="submit"
							/>
							<Button
								text="Back"
								type="button"
								onClick={() => navigate(ROUTER_KEYS.DASHBOARD)}
							/>
						</div>
					</Form>
				</Formik>
			</div>
		</>
	);
};
