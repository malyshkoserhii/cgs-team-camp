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
import { Loader } from '~shared/components';

export const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
	const { deleteTodo, patchTodoById, loading } = useTodoStore();
	const navigate = useNavigate();
	const { id, title, description, isCompleted } = todo;

	const handleView = (): void => {
		navigate(`/view/${id}`);
	};

	const handleDelete = (): void => {
		deleteTodo(id);
	};

	const handleCheckboxChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	): Promise<void> => {
		await patchTodoById(id, {
			isCompleted: event.target.checked,
		});
	};

	if (loading) {
		return <Loader loading={loading} />;
	}

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
				<label>
					<input
						type="checkbox"
						checked={isCompleted}
						onChange={(event) => handleCheckboxChange(event)}
					/>
					Completed
				</label>
			</div>
		</div>
	);
};
