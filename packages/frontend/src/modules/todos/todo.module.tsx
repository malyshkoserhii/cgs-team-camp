// import { useEffect } from 'react';
// import { useTodoStore } from '../../store';
import TodoForm from '../../shared/components/todos/todo.form';
import TodoList from '../../shared/components/todos/todo.container';

const TodoPage: React.FC = () => {
	// const { todos, fetchTodos } = useTodoStore();
	//
	// useEffect(() => {
	// 	fetchTodos();
	// }, [fetchTodos]);

	return (
		<div>
			<h1>Todo List</h1>
			<TodoForm />
			<TodoList />
		</div>
	);
};

export default TodoPage;
