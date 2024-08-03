import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTodoStore } from '~store/todoStore';

const TodoDetailsPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { getTodoById, removeTodo } = useTodoStore();
	const todo = getTodoById(Number(id));

	const handleEditClick = (): void => {
		navigate(`/edit-todo/${id}`);
	};

	const handleDeleteClick = async (): Promise<void> => {
		if (todo) {
			await removeTodo(todo.id);
			navigate('/');
		}
	};

	if (!todo) {
		return <div>Todo not found</div>;
	}

	return (
		<div>
			<h1>{todo.title}</h1>
			<p>{todo.description}</p>
			<p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
			<button onClick={handleEditClick}>Edit</button>
			<button onClick={handleDeleteClick}>Delete</button>
		</div>
	);
};

export default TodoDetailsPage;
