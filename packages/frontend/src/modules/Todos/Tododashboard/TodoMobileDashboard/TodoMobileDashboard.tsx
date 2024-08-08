import React from 'react';

import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { Todo } from '~shared/types/todo.types';
import TodoItem from '../../TodoItem/TodoItem';
import { MobileDashboardItem } from './TodoMobileDashboard.styles';

export type TodoListProps = {
	todos: Todo[];
	removeTodo: (id: number) => void;
	additional?: string;
	nextPage?: () => void;
	isLastPage?: boolean;
	page?: number;
};

const TodoList: React.FC<TodoListProps> = ({
	todos,
	removeTodo,
	nextPage,
	isLastPage,
	page,
}) => {
	useBottomScrollListener(
		() => {
			if (!isLastPage && nextPage) {
				nextPage();
			}
		},
		{ debounce: 400 },
	);
	React.useEffect(() => {
		if (page > 1) {
			window.scrollTo(0, page * 1000);
		}
	}, [page]);

	return (
		<div>
			<h1>Todo List</h1>
			<ul>
				{todos?.map((todo: Todo) => (
					<TodoItem
						key={todo.id}
						todo={todo}
						removeTodo={removeTodo}
						additional={MobileDashboardItem}
					/>
				))}
			</ul>
		</div>
	);
};

export default TodoList;
