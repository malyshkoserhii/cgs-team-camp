import React from 'react';
import { TodoItem } from '../todo-item/todo-item.component';
import { Layout } from '~shared/components/layout/layout.component';
import { ITodo } from '~/types/todo.type';

export type TodoContainerProps = {
	todos: ITodo[];
};

export const TodoContainer: React.FC<TodoContainerProps> = ({ todos }) => {
	return (
		<div>
			<h1>TODO CONTAINER</h1>
			<Layout<ITodo> items={todos} render={TodoItem} />
		</div>
	);
};
