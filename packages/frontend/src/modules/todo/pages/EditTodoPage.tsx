import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTodoStore } from '~store/todoStore';
import { UpdateTodoType } from '~/utils/types';

interface EditTodoFormValues {
	title: string;
	description: string;
	completed: boolean;
}

const EditTodoPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { getTodoById, updateTodo } = useTodoStore();
	const [todo, setTodo] = useState(() => getTodoById(Number(id)));

	useEffect(() => {
		setTodo(getTodoById(Number(id)));
	}, [id, getTodoById]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<EditTodoFormValues>({
		defaultValues: {
			title: todo?.title || '',
			description: todo?.description || '',
			completed: todo?.completed || false,
		},
	});

	const onSubmit: SubmitHandler<EditTodoFormValues> = async (data) => {
		if (todo) {
			await updateTodo(todo.id, data as UpdateTodoType);
			navigate('/');
		}
	};

	if (!todo) {
		return <div>Todo not found</div>;
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label htmlFor="title">Title</label>
				<input
					id="title"
					{...register('title', { required: 'Title is required' })}
				/>
				{errors.title && <span>{errors.title.message}</span>}
			</div>
			<div>
				<label htmlFor="description">Description</label>
				<input
					id="description"
					{...register('description', {
						required: 'Description is required',
					})}
				/>
				{errors.description && (
					<span>{errors.description.message}</span>
				)}
			</div>
			<div>
				<label htmlFor="completed">Completed</label>
				<input
					type="checkbox"
					id="completed"
					{...register('completed')}
				/>
			</div>
			<button type="submit">Save</button>
		</form>
	);
};

export default EditTodoPage;
