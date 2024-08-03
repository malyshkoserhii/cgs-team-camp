import React from 'react';

import { useTodoStore } from '~store/todo.store';
import { Todo } from '~typings/todo.types';
import {
	buttonGroupStyle,
	descriptionStyle,
	elementStyle,
} from '~modules/todos/TodoItem/TodoItem.styles';
import Button from '~shared/components/button/button.component';
import { useNavigate } from 'react-router-dom';

export const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
	const { deleteTodo } = useTodoStore();
	const navigate = useNavigate();
	const { id, title, description } = todo;

	const handleView = (): void => {
		navigate(`/view/${id}`);
		console.log('go to view page');
	};

	const handleDelete = (): void => {
		deleteTodo(id);
	};

	return (
		<div className={elementStyle}>
			<h3>{title}</h3>
			<p className={descriptionStyle}>{description}</p>
			<div className={buttonGroupStyle}>
				<Button
					text={'Delete'}
					type={'button'}
					onClick={handleDelete}
				/>
				<Button text={'View'} type={'button'} onClick={handleView} />
			</div>
		</div>
	);
};
