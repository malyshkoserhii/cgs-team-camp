import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTodoStore } from '~store/todoStore';
import { UpdateTodoType } from '~/utils/types';
import {
	formContainerStyles,
	labelStyles,
	inputStyles,
	checkboxStyles,
	buttonContainerStyles,
	inputContainerStyles,
} from './TodoPage.styles';
import Button from '~shared/components/button/button.component';

interface EditTodoFormValues {
	title: string;
	description: string;
	completed: boolean;
}

const EditTodoPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { getTodoById, updateTodo } = useTodoStore();
	const [todo, setTodo] = useState<EditTodoFormValues | undefined>(() =>
		getTodoById(Number(id)),
	);

	useEffect(() => {
		setTodo(getTodoById(Number(id)));
	}, [id, getTodoById]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<EditTodoFormValues>({
		defaultValues: {
			title: todo?.title || '',
			description: todo?.description || '',
			completed: todo?.completed || false,
		},
	});

	useEffect(() => {
		reset({
			title: todo?.title || '',
			description: todo?.description || '',
			completed: todo?.completed || false,
		});
	}, [todo, reset]);

	const onSubmit: SubmitHandler<EditTodoFormValues> = async (data) => {
		if (todo) {
			await updateTodo(Number(id), data as UpdateTodoType);
			navigate('/');
		}
	};

	if (!todo) {
		return <div>Todo not found</div>;
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={formContainerStyles}>
			<div className={inputContainerStyles}>
				<label htmlFor="title" className={labelStyles}>
					Title
				</label>
				<input
					id="title"
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
				{errors.description && <p>{errors.description.message}</p>}
			</div>
			<div className={inputContainerStyles}>
				<label htmlFor="completed" className={labelStyles}>
					Completed
					<input
						type="checkbox"
						id="completed"
						{...register('completed')}
						className={checkboxStyles}
					/>
				</label>
			</div>
			<div className={buttonContainerStyles}>
				<Button type="submit" text="Save" />
				<Button text="Back" onClick={() => navigate(-1)} />
			</div>
		</form>
	);
};

export default EditTodoPage;
