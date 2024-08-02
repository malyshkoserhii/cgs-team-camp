import TodoForm from '~shared/components/todoForm/TodoForm';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ICreateTodo } from '~shared/interfaces/todo.interface';
import { useNavigate } from 'react-router-dom';
import { useTodoStore } from '~store/todo.store';
import { ROUTER_KEYS } from '~shared/keys';

const CreateTodo = (): React.ReactNode => {
	const navigate = useNavigate();
	const createTodo = useTodoStore((state) => state.createTodo);
	const { handleSubmit, reset, register } = useForm<ICreateTodo>();

	const onSubmit = (data: ICreateTodo): void => {
		navigate(ROUTER_KEYS.ALL_MATCH);
		console.log(data);

		createTodo(data);
		reset();
	};

	return (
		<div>
			<TodoForm
				title="Create a new todo"
				onSubmit={onSubmit}
				handleSubmit={handleSubmit}
			>
				<div>
					<label>Title</label>
					<input
						{...register('title')}
						style={{ border: '1px solid black' }}
					></input>
				</div>
				<div>
					<label>Description</label>
					<textarea
						{...register('description')}
						style={{ border: '1px solid black' }}
					/>
				</div>
				<div>
					<label>Public</label>
					<input
						type="checkbox"
						{...register('public')}
						style={{ border: '1px solid black' }}
					></input>
				</div>
				<div>
					<label>Completed</label>
					<input
						type="checkbox"
						{...register('completed')}
						style={{ border: '1px solid black' }}
					></input>
				</div>
			</TodoForm>
		</div>
	);
};

export default CreateTodo;
