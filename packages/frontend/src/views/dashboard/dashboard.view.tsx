import React, { FC, useCallback } from 'react';
import { Tab } from '@blueprintjs/core';

import TodoContainer from './components/todo-container/todo-container.component';
import Loader from '~shared/components/loader/loader.component';
import {
	DashboardContainer,
	TopBar,
	TabGroup,
	SearchInput,
} from './components/dashboard-elements.component';
import {
	useDeleteTodo,
	useGetAllTodos,
	useUpdateTodo,
} from '~/api/hooks/useTodo';

import type { Todo } from '~typings/todo';

const Dashboard: FC = () => {
	const { data: todos, isLoading, error } = useGetAllTodos();
	const { mutateAsync: updateTodo } = useUpdateTodo();
	const { mutateAsync: deleteTodo } = useDeleteTodo();

	const handleUpdateTodo = useCallback(
		async (updatedTodo: Todo) => {
			await updateTodo({
				id: updatedTodo.id,
				data: updatedTodo,
			});
		},
		[updateTodo],
	);

	const handleDeleteTodo = useCallback(
		async (id: string) => {
			await deleteTodo(id);
		},
		[deleteTodo],
	);

	if (isLoading) return <Loader />;
	if (error) return <p>{error.message}</p>;

	return (
		<DashboardContainer>
			<TopBar>
				<TabGroup>
					<Tab>All</Tab>
					<Tab>Private</Tab>
					<Tab>Public</Tab>
					<Tab>Completed</Tab>
				</TabGroup>
				<SearchInput type="text" placeholder="Search" />
			</TopBar>
			<TodoContainer
				todos={todos}
				handleUpdateTodo={handleUpdateTodo}
				handleDeleteTodo={handleDeleteTodo}
			/>
		</DashboardContainer>
	);
};

export default Dashboard;
