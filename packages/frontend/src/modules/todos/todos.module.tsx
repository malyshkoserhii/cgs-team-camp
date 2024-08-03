import React, { useEffect } from 'react';

import { useTodoStore } from '~store/todo.store';
import { containerStyle } from '~modules/todos/todos.styles';
import { TodoList } from '~modules/todos/TodoList/TodoList';
import { useMediaQuery } from 'react-responsive';
import { DEVICE } from '~shared/keys';

export const TodosModule = (): React.ReactNode => {
	const { todos, getTodos, loading, error } = useTodoStore();

	useEffect(() => {
		getTodos();
	}, [getTodos]);

	const isMobile =
		useMediaQuery({ query: DEVICE.mobile }) && !loading && !error;
	// const isTablet =
	// 	useMediaQuery({ query: DEVICE.tablet }) && !loading && !error;
	// const isLaptop =
	// 	useMediaQuery({ query: DEVICE.laptop }) && !loading && !error;
	// const isDesktop =
	// 	useMediaQuery({ query: DEVICE.desktop }) && !loading && !error;

	return (
		<div className={containerStyle}>
			{isMobile && <TodoList todos={todos} />}
			{loading && <div className={containerStyle}>Loading...</div>}
			{error && (
				<div className={containerStyle}>Error: {error.message}</div>
			)}
		</div>
	);
};
