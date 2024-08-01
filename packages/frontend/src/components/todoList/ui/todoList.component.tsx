import { ReactElement, useEffect } from 'react';
import { TodoI } from '~shared/interfaces/todo.interface';
import { AppGrid } from '~shared/ui/grid';
import { Loader } from '~shared/ui/loader';
import { TodoItem } from '~shared/ui/todo';
import { useTodoStore } from '~store/todos.store';
import { listBoxStyle } from './todoList.styles';

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
			<AppGrid<TodoI> items={items || []} renderItem={TodoItem} />
		</div>
	);
};
