import React from 'react';

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

const TodoList: React.FC<TodoListProps> = ({ todos, removeTodo }) => {
	return (
		<div>
			<h1 style={{ marginBottom: '40px' }}>Todo List</h1>
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
