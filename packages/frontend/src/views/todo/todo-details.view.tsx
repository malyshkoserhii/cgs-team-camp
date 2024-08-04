import React, { useCallback, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@blueprintjs/core';

import { useGetTodoById, useUpdateTodo } from '~/api/hooks/useTodo';
import Loader from '~shared/components/loader/loader.component';
import { ROUTER_KEYS } from '~shared/keys';
import TodoFormModal from '~shared/modals/todo/todo-form.modal';
import { showTodoStatus } from '~/utils/showTodoStatus';

import { sectionHeading, todoDetailsWrapper } from './todo-details.styles';

import { Todo } from '~typings/todo';

const TodoDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const { isLoading, data: todo, error } = useGetTodoById(id);
	const { mutateAsync: updateTodo } = useUpdateTodo();

	const [isEditTodoFormOpen, setIsEditTodoFormOpen] = useState(false);

	const openEditTodoForm = useCallback(() => setIsEditTodoFormOpen(true), []);

	const closeEditTodoForm = useCallback(
		() => setIsEditTodoFormOpen(false),
		[],
	);

	const handleUpdateTodo = useCallback(
		async (updatedTodo: Todo) => {
			await updateTodo({
				id: updatedTodo.id,
				data: updatedTodo,
			});
		},
		[updateTodo],
	);

	if (isLoading) return <Loader />;
	if (error) return <p>{error.message}</p>;

	const { name, description, status, isPrivate } = todo;

	return (
		<div className={todoDetailsWrapper}>
			<span className={sectionHeading}>Name</span>
			<h2>{name}</h2>
			{description && (
				<>
					<span className={sectionHeading}>Description</span>
					<p>{description}</p>
				</>
			)}
			<span className={sectionHeading}>Status:</span>
			<p>{showTodoStatus(status)}</p>
			<span className={sectionHeading}>Access:</span>
			<p>{isPrivate ? 'Private' : 'Public'}</p>
			<Button intent="primary" onClick={openEditTodoForm}>
				Edit
			</Button>
			<Button onClick={() => navigate(ROUTER_KEYS.DASHBOARD)}>
				Back
			</Button>
			<TodoFormModal
				initialValues={todo}
				isOpen={isEditTodoFormOpen}
				onClose={closeEditTodoForm}
				onSubmit={handleUpdateTodo}
			/>
		</div>
	);
};

export default TodoDetails;
