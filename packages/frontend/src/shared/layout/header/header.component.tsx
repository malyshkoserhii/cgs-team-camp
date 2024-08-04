import React, { FC, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@blueprintjs/core';

import { useCreateTodo } from '~/api/hooks/useTodo';
import { ROUTER_KEYS } from '~shared/keys';
import TodoFormModal from '~shared/modals/todo/todo-form.modal';

import { headerStyles, buttonGroupWrapper } from './header.styles';

import type { Todo } from '~typings/todo';

const Header: FC = () => {
	const navigate = useNavigate();

	const { mutateAsync: createTodo } = useCreateTodo();
	const [isCreateTodoFormOpen, setIsCreateTodoFormOpen] = useState(false);

	const openCreateTodoForm = useCallback(
		() => setIsCreateTodoFormOpen(true),
		[],
	);

	const closeCreateTodoForm = useCallback(
		() => setIsCreateTodoFormOpen(false),
		[],
	);

	const handleSubmit = useCallback(
		async (values: Todo) => {
			await createTodo(values);
			closeCreateTodoForm();
		},
		[createTodo, closeCreateTodoForm],
	);

	return (
		<header className={headerStyles()}>
			<div className={buttonGroupWrapper()}>
				<Button intent="success" onClick={openCreateTodoForm}>
					Add todo
				</Button>
				<Button
					intent="primary"
					onClick={() => navigate(ROUTER_KEYS.LOGIN)}
				>
					Login
				</Button>
				<Button
					intent="primary"
					onClick={() => navigate(ROUTER_KEYS.REGISTER)}
				>
					Sign Up
				</Button>
			</div>
			<TodoFormModal
				isOpen={isCreateTodoFormOpen}
				onClose={closeCreateTodoForm}
				onSubmit={handleSubmit}
			/>
		</header>
	);
};

export default Header;
