import { ReactElement, useEffect } from 'react';
import { TodoI } from '~shared/interfaces/todo.interface';
import { AppGrid } from '~shared/ui/grid';
import { Loader } from '~shared/ui/loader';
import { TodoItem } from '~shared/ui/todo';
import { useTodoStore } from '~store/todos.store';

export const TodoList = (): ReactElement => {
	const { items, loading, fetchTodos } = useTodoStore();

	useEffect(() => {
		fetchTodos();
	}, [fetchTodos]);

	if (loading) {
		return <Loader fullHeight />;
	}

	return (
		<>
			<AppGrid<TodoI>
				columns={{ base: 1, xs: 1, md: 1, lg: 1 }}
				items={items || []}
				renderItem={TodoItem}
			/>
		</>
	);
};
