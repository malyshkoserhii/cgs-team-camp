import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '~shared/components/input/input.component';
import Textarea from '~shared/components/textarea/textarea.component';
import TodoForm from '~shared/components/todoForm/TodoForm';
import { ICreateTodo } from '~shared/interfaces/todo.interface';
import { ROUTER_KEYS } from '~shared/keys';
import { useTodoStore } from '~store/todo.store';

const editTodoPage = (): React.ReactNode => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const updateTodo = useTodoStore((state) => state.updateTodo);
	const getTodoById = useTodoStore((state) => state.getTodoById);
	const selectedTodo = useTodoStore((state) => state.todo);

	const { handleSubmit, reset, register } = useForm<ICreateTodo>();

	const onSubmit = (data: ICreateTodo): void => {
		navigate(ROUTER_KEYS.ALL_MATCH);
		updateTodo(id, data);
		reset;
	};

	useEffect(() => {
		getTodoById(id);
	}, [id]);

	return (
		<div>
			{selectedTodo && (
				<TodoForm
					title="Edit todo"
					onSubmit={onSubmit}
					handleSubmit={handleSubmit}
				>
					<Input
						label="Title"
						defaultValue={selectedTodo.title}
						{...register('title')}
					/>
					<Textarea
						label="Description"
						defaultValue={selectedTodo.description}
						{...register('description')}
					/>
					<Input
						label="Public"
						type="checkbox"
						defaultChecked={selectedTodo.public}
						{...register('public')}
					/>
					<Input
						label="Completed"
						type="checkbox"
						defaultChecked={selectedTodo.completed}
						{...register('completed')}
					/>
				</TodoForm>
			)}

			{!selectedTodo && <div>Todo Not Found</div>}
		</div>
	);
};

export default editTodoPage;
