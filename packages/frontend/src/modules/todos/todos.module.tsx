import React, { useEffect } from 'react';

import { useTodoStore } from '~store/todo.store';
import { containerStyle } from '~modules/todos/todos.styles';
import { TodoList } from '~modules/todos/TodoList/TodoList';

export const TodosModule = (): React.ReactNode => {
	const { todos, getTodos, loading, error } = useTodoStore();

	useEffect(() => {
		getTodos();
	}, [getTodos]);

	return (
		<div className={containerStyle}>
			{!loading && !error && <TodoList todos={todos} />}
			{loading && <div className={containerStyle}>Loading...</div>}
			{error && (
				<div className={containerStyle}>Error: {error.message}</div>
			)}
		</div>
	);
};
