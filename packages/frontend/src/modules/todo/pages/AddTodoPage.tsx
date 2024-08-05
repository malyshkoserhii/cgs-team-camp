import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '~shared/components/button/button.component';
import { ValidationError } from '~/utils/errors';
import { CreateTodoType } from '~/utils/types';
import { useTodoStore } from '~store/todoStore';
import { ROUTER_KEYS } from '~shared/keys/router-keys';
import Input from './Input';
import Textarea from './Textarea';
import Checkbox from './Checkbox';
import { formContainerStyles, buttonContainerStyles } from './TodoPage.styles';
import { createTodoSchema } from '~/utils/validationSchema';
import { joiResolver } from '@hookform/resolvers/joi';

const AddTodoPage: React.FC = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<CreateTodoType>({
		resolver: joiResolver(createTodoSchema),
	});
	const navigate = useNavigate();
	const { addTodo } = useTodoStore();

	const onSubmitHandler: SubmitHandler<CreateTodoType> = async (data) => {
		try {
			await addTodo(data);
			navigate(ROUTER_KEYS.DASHBOARD);
		} catch (error) {
			if (error instanceof ValidationError) {
				setError('title', { type: 'manual', message: error.message });
			} else {
				console.error('Unexpected error:', error);
			}
		}
	};

	const handleBackClick = (): void => {
		navigate(-1);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmitHandler)}
			className={formContainerStyles}
		>
			<Input<CreateTodoType>
				id="title"
				label="Title"
				register={register}
				errors={errors.title}
				required
			/>
			<Textarea<CreateTodoType>
				id="description"
				label="Description"
				register={register}
				errors={errors.description}
			/>
			<Checkbox<CreateTodoType>
				id="completed"
				label="Completed"
				register={register}
			/>
			<div className={buttonContainerStyles}>
				<Button type="submit" text="Add Todo" />
				<Button text="Back" onClick={handleBackClick} />
			</div>
		</form>
	);
};

export default AddTodoPage;
