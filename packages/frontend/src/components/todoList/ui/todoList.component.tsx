import { ReactElement } from 'react';
import { useGetTodos } from '~shared/api/hooks/useGetTodos.hook';
import { TodoI } from '~shared/interfaces/todo.interface';
import { AppGrid } from '~shared/ui/grid';
import { Loader } from '~shared/ui/loader';
import { TodoItem } from '~shared/ui/todo';

export const TodoList = (): ReactElement => {
	const { data, loading } = useGetTodos();

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<AppGrid<TodoI>
				columns={{ base: 1, xs: 1, md: 1, lg: 1 }}
				items={data || []}
				renderItem={TodoItem}
			/>
		</>
	);
};
