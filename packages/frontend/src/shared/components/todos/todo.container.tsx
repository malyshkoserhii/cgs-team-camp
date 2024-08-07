import * as React from 'react';
import { useEffect } from 'react';
import TodoElement from './todo.element';
import { useTodoStore } from '../../../store';

const TodoList: React.FC = () => {
	const { todos, fetchTodos } = useTodoStore();

	useEffect(() => {
		fetchTodos();
	}, [fetchTodos]);

	return (
		<div>
			{todos.map((todo) => (
				<TodoElement key={todo.id} todo={todo} />
			))}
		</div>
	);
};

export default TodoList;
