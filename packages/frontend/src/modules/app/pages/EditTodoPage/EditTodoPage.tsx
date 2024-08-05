import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '~shared/components/form/form.component';
import { useNavigate, useParams } from 'react-router-dom';
import { useTodoStore } from '~store/todo.store';
import { TextInput } from '~shared/components/textinput/textinput.component';
import { CheckBox } from '~shared/components/checkbox/checkbox.component';
import { checkboxContainerStyles } from '../NewTodoPage/NewTodoPage.styles';
import { ROUTER_KEYS } from '~shared/keys';
import { TextArea } from '~shared/components/textarea/textarea.component';
import { Todo } from '~shared/types/todo.type';

export const EditTodoPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm<Omit<Todo, 'id'>>();
	const { myTodos, updateTodo } = useTodoStore();
	const [submitError, setSubmitError] = useState<string | undefined>(
		undefined,
	);

	const todo = myTodos.find((todo) => todo.id === Number(id));

	const onSubmit = async (data: Omit<Todo, 'id'>): Promise<void> => {
		try {
			await updateTodo(Number(id), data);

			reset();
			navigate(ROUTER_KEYS.TODO);
		} catch (error) {
			setSubmitError(
				error instanceof Error
					? error.message
					: 'An error occurred while editing the todo.',
			);
		}
	};

	return (
		<Form
			handleSubmit={handleSubmit}
			onSubmit={onSubmit}
			title={'Create new todo'}
			submitError={submitError}
		>
			<TextInput
				name="title"
				register={register}
				placeholder="Title"
				defaultValue={todo.title}
				required
				error={errors.title}
				minLength={3}
				maxLength={50}
			/>
			<TextArea
				name="description"
				register={register}
				placeholder="Description"
				defaultValue={todo.description}
				required
				error={errors.description}
				minLength={10}
				maxLength={500}
			/>
			<div className={checkboxContainerStyles}>
				<CheckBox
					name="completed"
					register={register}
					label="Completed"
					checked={todo.completed}
				/>
				<CheckBox
					name="public"
					register={register}
					label="Public"
					checked={todo.public}
				/>
			</div>
		</Form>
	);
};
