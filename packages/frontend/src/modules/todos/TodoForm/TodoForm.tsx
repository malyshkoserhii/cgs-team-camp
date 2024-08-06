import React, { useMemo } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

import { useTodoStore } from '~store/todo.store';
import { Todo } from '~typings/todo.types';
import { ROUTER_KEYS } from '~shared/keys';
import {
	Button,
	CustomCheckbox,
	CustomField,
	Loader,
} from '~shared/components';
import { container, formStyle } from '~modules/todos/TodoForm/TodoForm.styles';
import { buttonGroupStyle } from '~modules/todos/TodoItem/TodoItem.styles';
import { todoValidationSchema } from '../../../shared/schemas/todo.schema';

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

	const initialValues: Todo = useMemo(
		() => ({
			title: todo?.title || '',
			description: todo?.description || '',
			isCompleted: todo?.isCompleted || false,
			isPrivate: todo?.isPrivate || false,
		}),
		[todo],
	);

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
		<div className={container}>
			<h2>{isEdit ? 'Edit Todo' : 'Create Todo'}</h2>
			<Formik
				initialValues={initialValues}
				validationSchema={todoValidationSchema}
				onSubmit={handleSubmit}
			>
				<Form className={formStyle}>
					<CustomField id={'title'} name={'title'} label={'Title'} />

					<CustomField
						id={'description'}
						name={'description'}
						label={'Description'}
						as={'textarea'}
					/>

					<CustomCheckbox
						id={'isPrivate'}
						name={'isPrivate'}
						type={'checkbox'}
						label={'Private'}
					/>

					<CustomCheckbox
						id={'isCompleted'}
						name={'isCompleted'}
						type={'checkbox'}
						label={'Completed'}
					/>

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
	);
};
