import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
	titleStyles,
	descriptionStyles,
	statusStyles,
	buttonContainerStyles,
	formContainerStyles,
} from './TodoPage.styles';
import Button from '~shared/components/button/button.component';
import { useTodoStore } from '~store/todoStore';
import { ROUTER_KEYS } from '~shared/keys/router-keys';

const TodoDetailsPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { getTodoById, removeTodo } = useTodoStore();
	const todo = getTodoById(Number(id));

	const handleEditClick = (): void => {
		navigate(ROUTER_KEYS.TODO + `/${id}`);
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
		<div className={formContainerStyles}>
			<h1 className={titleStyles}>{todo.title}</h1>
			<p className={descriptionStyles}>{todo.description}</p>
			<p className={statusStyles}>
				{todo.completed ? 'Completed' : 'Not Completed'}
			</p>
			<div className={buttonContainerStyles}>
				<Button text="Edit" onClick={handleEditClick} />
				<Button text="Delete" onClick={handleDeleteClick} />
			</div>
		</div>
	);
};

export default TodoDetailsPage;
