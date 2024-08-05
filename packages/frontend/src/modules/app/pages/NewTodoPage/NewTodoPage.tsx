import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormData } from '~shared/components/form/form.component';
import { useNavigate } from 'react-router-dom';
import { useTodoStore } from '~store/todo.store';
import { TextInput } from '~shared/components/textinput/textinput.component';
import { CheckBox } from '~shared/components/checkbox/checkbox.component';
import { checkboxContainerStyles } from './NewTodoPage.styles';
import { ROUTER_KEYS } from '~shared/keys';
import { TextArea } from '~shared/components/textarea/textarea.component';

export const NewTodoPage: React.FC = () => {
	const navigate = useNavigate();
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm<FormData>();
	const addTodo = useTodoStore((state) => state.addTodo);
	const [submitError, setSubmitError] = useState<string | undefined>(
		undefined,
	);

	const onSubmit = async (data: FormData): Promise<void> => {
		try {
			await addTodo(data);
			reset();
			navigate(ROUTER_KEYS.TODO);
		} catch (error) {
			setSubmitError(
				error instanceof Error
					? error.message
					: 'An error occurred while adding the todo.',
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
				required
				error={errors.title}
				minLength={3}
				maxLength={50}
			/>
			<TextArea
				name="description"
				register={register}
				placeholder="Description"
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
					checked={false}
				/>
				<CheckBox
					name="public"
					register={register}
					label="Public"
					checked={false}
				/>
			</div>
		</Form>
	);
};
