import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { css } from '@emotion/css';
import Button from '~shared/components/button/button.component';

interface AddTodoFormValues {
	title: string;
	description: string;
	completed: boolean;
}

const formStyles = css`
	display: flex;
	flex-direction: column;
	gap: 16px; /* Adjust the spacing as needed */
`;

const AddTodoForm: React.FC<{
	onSubmit: (values: AddTodoFormValues) => Promise<void>;
}> = ({ onSubmit }) => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<AddTodoFormValues>();

	const onSubmitHandler: SubmitHandler<AddTodoFormValues> = async (data) => {
		try {
			await onSubmit(data);
		} catch (error) {
			if (error instanceof Error) {
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

export default AddTodoForm;
