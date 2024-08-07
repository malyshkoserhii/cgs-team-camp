import * as React from 'react';
import { TodoType } from '../../../typings/todos.type';
import { useTodoStore } from '../../../store';

interface TodoItemProps {
	todo: TodoType;
}

const TodoElement: React.FC<TodoItemProps> = ({ todo }) => {
	const { updateTodo, removeTodo } = useTodoStore();

	const handleDelete = (todo): void => {
		removeTodo(todo.id);
	};
	const handleToggleStatus = (): void => {
		updateTodo({
			id: todo.id, // Ensuring the id is included
			status: todo.status === 'ToDo' ? 'Done' : 'ToDo',
			name: todo.name,
			date: todo.date,
			descr: todo.descr,
			updateTime: todo.updateTime,
			dashboardId: todo.dashboardId,
			userId: todo.userId,
		});
	};

	return (
		<div>
			<h3>{todo.name}</h3>
			<p>{todo.descr}</p>
			<p>Status: {todo.status}</p>
			<button onClick={handleToggleStatus}>
				Mark as {todo.status === 'ToDo' ? 'Done' : 'ToDo'}
			</button>
			<button onClick={() => handleDelete(todo)}>Delete</button>
		</div>
	);
};

export default TodoElement;
