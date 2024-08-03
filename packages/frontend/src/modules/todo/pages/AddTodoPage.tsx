import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/css';
import Button from '~shared/components/button/button.component';
import { ValidationError } from '~/utils/errors';
import { CreateTodoType } from '~/utils/types';
import { useTodoStore } from '~store/todoStore';

const formStyles = css`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

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
		<form onSubmit={handleSubmit(onSubmitHandler)} className={formStyles}>
			<div>
				<label htmlFor="title">Title</label>
				<input
					id="title"
					type="text"
					{...register('title', { required: 'Title is required' })}
				/>
				{errors.title && <p>{errors.title.message}</p>}
			</div>
			<div>
				<label htmlFor="description">Description</label>
				<textarea id="description" {...register('description')} />
			</div>
			<div>
				<label htmlFor="completed">
					<input
						id="completed"
						type="checkbox"
						{...register('completed')}
					/>
					Completed
				</label>
			</div>
			<Button type="submit" text="Add Todo" />
		</form>
	);
};

export default AddTodoPage;
