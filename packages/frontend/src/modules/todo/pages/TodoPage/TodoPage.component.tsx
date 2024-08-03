import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoElement from '~modules/todo/components/TodoElement/TodoElement.component';
import { useTodoStore } from '~store/todoStore';

const TodoPage: React.FC = () => {
	const { todos, fetchTodos } = useTodoStore();
	const navigate = useNavigate();

	useEffect(() => {
		fetchTodos();
	}, [fetchTodos]);

	const handleAddTodoClick = (): void => {
		navigate('/add-todo');
	};

	const handleTodoClick = (id: number): void => {
		navigate(`/todo/${id}`);
	};

	return (
		<div>
			{todos.map((todo, index) => (
				<TodoElement
					key={index}
					id={todo.id}
					title={todo.title}
					description={todo.description}
					completed={todo.completed}
					onClick={() => handleTodoClick(todo.id)}
				/>
			))}
			<button onClick={handleAddTodoClick}>Add Todo</button>
		</div>
	);
};

export default TodoPage;
