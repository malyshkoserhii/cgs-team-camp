import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useTodoStore } from '~store/todo.store';
import { containerStyle } from '~modules/todos/todos.styles';
import { TodoList } from '~modules/todos/TodoList/TodoList';
import { Loader } from '~shared/components';

export const TodosModule = (): React.ReactNode => {
	const { todos, getTodos, loading, error } = useTodoStore();

	useEffect(() => {
		getTodos();
	}, [getTodos]);

	return (
		<div className={containerStyle}>
			{!loading && !error && <TodoList todos={todos} />}
			{loading && <Loader loading={loading} />}
			{error && toast.error(error.message)}
		</div>
	);
};
