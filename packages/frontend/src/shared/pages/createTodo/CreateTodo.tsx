import TodoForm from '~shared/components/todoForm/todoForm.component';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ICreateTodo } from '~shared/interfaces/todo.interface';
import { useNavigate } from 'react-router-dom';
import { useTodoStore } from '~store/todo.store';
import { ROUTER_KEYS } from '~shared/keys';
import { yupResolver } from '@hookform/resolvers/yup';
import { createTodoSchema } from '~shared/schemas/todo.schema';

const CreateTodo = (): React.ReactNode => {
	const navigate = useNavigate();
	const { createTodo } = useTodoStore();
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm<ICreateTodo>({
		resolver: yupResolver(createTodoSchema),
	});

	const onSubmit = (data: ICreateTodo): void => {
		navigate(ROUTER_KEYS.HOME);

		createTodo(data);
		reset();
	};

	return (
		<div>
			<TodoForm
				title="Create a new todo"
				onSubmit={onSubmit}
				handleSubmit={handleSubmit}
				register={register}
				errors={errors}
			/>
		</div>
	);
};

export default CreateTodo;
