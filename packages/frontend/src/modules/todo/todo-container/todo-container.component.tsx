import React from 'react';
import { ITodo, TodoItem } from '../todo-item/todo-item.component';

export type TodoContainerProps = {
	todos: ITodo[];
};

export const TodoContainer: React.FC<TodoContainerProps> = ({ todos }) => {
	return (
		<div>
			<h1>TODO CONTAINER</h1>
			{todos.map((item) => (
				<TodoItem key={item.id} todo={item} />
			))}
		</div>
	);
};
