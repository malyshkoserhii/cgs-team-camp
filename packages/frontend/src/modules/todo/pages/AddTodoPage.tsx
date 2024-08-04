import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '~shared/components/button/button.component';
import { ValidationError } from '~/utils/errors';
import { CreateTodoType } from '~/utils/types';
import { useTodoStore } from '~store/todoStore';
import {
	formContainerStyles,
	labelStyles,
	inputStyles,
	checkboxStyles,
	buttonContainerStyles,
	inputContainerStyles,
} from './TodoPage.styles';

const AddTodoPage: React.FC = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<CreateTodoType>();
	const navigate = useNavigate();
	const { addTodo } = useTodoStore();

	const onSubmitHandler: SubmitHandler<CreateTodoType> = async (data) => {
		try {
			await addTodo(data);
			navigate('/');
		} catch (error) {
			if (error instanceof ValidationError) {
				setError('title', { type: 'manual', message: error.message });
			} else {
				console.error('Unexpected error:', error);
			}
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmitHandler)}
			className={formContainerStyles}
		>
			<div className={inputContainerStyles}>
				<label htmlFor="title" className={labelStyles}>
					Title
				</label>
				<input
					id="title"
					type="text"
					{...register('title', { required: 'Title is required' })}
					className={inputStyles}
				/>
				{errors.title && <p>{errors.title.message}</p>}
			</div>
			<div className={inputContainerStyles}>
				<label htmlFor="description" className={labelStyles}>
					Description
				</label>
				<textarea
					id="description"
					{...register('description')}
					className={inputStyles}
				/>
			</div>
			<div className={inputContainerStyles}>
				<label htmlFor="completed" className={labelStyles}>
					Completed
					<input
						id="completed"
						type="checkbox"
						{...register('completed')}
						className={checkboxStyles}
					/>
				</label>
			</div>
			<div className={buttonContainerStyles}>
				<Button type="submit" text="Add Todo" />
				<Button text="Back" onClick={() => navigate(-1)} />
			</div>
		</form>
	);
};

export default AddTodoPage;
