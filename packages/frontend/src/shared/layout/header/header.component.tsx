import React, { FC, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@blueprintjs/core';

import { useCreateTodo } from '~/api/hooks/useTodo';
import { ROUTER_KEYS } from '~shared/keys';
import TodoFormModal from '~shared/modals/todo/todo-form.modal';
import { useLogout } from '~/api/hooks/useUser';
import { useAuthStore } from '~store/auth.store';

import { headerStyles, buttonGroupWrapper } from './header.styles';

import type { Todo } from '~typings/todo';

const Header: FC = () => {
	const navigate = useNavigate();
	const { clearAuth } = useAuthStore();

	const { mutateAsync: createTodo } = useCreateTodo();
	const { mutateAsync: logout } = useLogout();

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

	const handleLogout = useCallback(async () => {
		await logout();
		clearAuth();
	}, [logout, clearAuth, navigate]);

	return (
		<header className={headerStyles()}>
			<div className={buttonGroupWrapper()}>
				<Button intent="success" onClick={openCreateTodoForm}>
					Add todo
				</Button>
				<Button intent="danger" onClick={handleLogout}>
					Log out
				</Button>
				<Button onClick={() => navigate(ROUTER_KEYS.PROFILE)}>
					My Profile
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
