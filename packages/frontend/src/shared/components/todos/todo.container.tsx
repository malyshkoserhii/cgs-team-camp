import { useEffect } from 'react';
import { useTodoStore } from '../../../store/index';
import { TodoType } from '../../../typings/todos.type';
import TodoElement from '../todos/todo.element';
interface TodoListProps {
	dashboardId?: number;
}

const TodoList: React.FC<TodoListProps> = ({ dashboardId }) => {
	const { todos, fetchTodos, getTodoItemsByDashboard } = useTodoStore(
		(state) => ({
			todos: state.todos,
			fetchTodos: state.fetchTodos,
			getTodoItemsByDashboard: state.getTodoItemsByDashboard,
		}),
	);

	useEffect(() => {
		dashboardId ? getTodoItemsByDashboard(dashboardId) : fetchTodos();
	}, [fetchTodos, dashboardId, getTodoItemsByDashboard]);

	return (
		<div>
			<h2>Todo List</h2>
			<ul>
				{todos.map((todo: TodoType) => (
					<TodoElement key={todo.id} todo={todo} />
				))}
			</ul>
		</div>
	);
};

export default TodoList;
