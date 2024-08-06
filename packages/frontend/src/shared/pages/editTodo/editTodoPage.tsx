import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import TodoForm from '~shared/components/todoForm/todoForm.component';
import { ICreateTodo } from '~shared/interfaces/todo.interface';
import { ROUTER_KEYS } from '~shared/keys';
import { useTodoStore } from '~store/todo.store';
import { yupResolver } from '@hookform/resolvers/yup';
import { upadteTodoSchema } from '~shared/schemas/todo.schema';
import NotFoundPage from '../notFoundPage/NotFoundPage';

const editTodoPage = (): React.ReactNode => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { updateTodo, getTodoById, todo: selectedTodo } = useTodoStore();

	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm<ICreateTodo>({
		resolver: yupResolver(upadteTodoSchema),
	});

	const onSubmit = (data: ICreateTodo): void => {
		navigate(ROUTER_KEYS.HOME);
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
					defaultValue={selectedTodo}
					register={register}
					errors={errors}
				/>
			)}

			{!selectedTodo && <NotFoundPage />}
		</div>
	);
};

export default editTodoPage;
