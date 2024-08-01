import { ReactElement, useEffect } from 'react';
import { TodoI } from '~shared/interfaces/todo.interface';
import { Heading } from '~shared/ui/base/heading';
import { AppGrid } from '~shared/ui/grid';
import { Loader } from '~shared/ui/loader';
import { TodoItem } from '~shared/ui/todo';
import { useTodoStore } from '~store/todos.store';
import { headingStyle, listBoxStyle } from './todoList.styles';

export const TodoList = (): ReactElement => {
	const { items, loading, fetchTodos } = useTodoStore();

	useEffect(() => {
		fetchTodos();
	}, [fetchTodos]);

	if (loading) {
		return <Loader fullHeight />;
	}

	return (
		<div className={listBoxStyle}>
			<Heading className={headingStyle}>Tasks</Heading>
			<AppGrid<TodoI> items={items || []} renderItem={TodoItem} />
		</div>
	);
};
