import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useTodoStore } from '~store/todo.store';
import { Todo } from '~typings/todo.types';
import { Button, Loader } from '~shared/components';
import {
	buttonGroupStyle,
	descriptionStyle,
	elementStyle,
	labelWrapper,
} from '~modules/todos/TodoItem/TodoItem.styles';
import { useAuthStore } from '~store/auth.store';

export const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
	const { deleteTodo, patchTodoById, loading } = useTodoStore();
	const { isAuth } = useAuthStore();

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

			{isAuth && (
				<div className={buttonGroupStyle}>
					<Button
						text={'Delete'}
						type={'button'}
						onClick={handleDelete}
					/>
					<Button
						text={'View'}
						type={'button'}
						onClick={handleView}
					/>
					<label className={labelWrapper}>
						<input
							type="checkbox"
							checked={isCompleted}
							onChange={(event) => handleCheckboxChange(event)}
						/>
						Completed
					</label>
				</div>
			)}
		</div>
	);
};
