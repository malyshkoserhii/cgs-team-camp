import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { omit } from 'lodash';

import {
	useDeleteTodo,
	useGetAllTodos,
	useUpdateTodo,
} from '~/api/hooks/useTodo';
import Loader from '~shared/components/loader/loader.component';
import { DashboardContainer } from './components/dashboard-elements.component';
import FiltersSection from './components/filters-section.component';
import TodoContainer from './components/todo-container/todo-container.component';
import { PAGE_SIZE } from './const';

import type { Todo } from '~typings/todo';

const Dashboard: FC = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [page, setPage] = useState(1);

	const filters = useMemo(() => {
		const params = Object.fromEntries(searchParams.entries());
		return {
			search: params.search,
			isPrivate: params.isPrivate,
			status: params.status,
		};
	}, [searchParams]);

	const { data, refetch, isLoading, error } = useGetAllTodos(
		filters,
		page,
		PAGE_SIZE,
	);

	const { mutateAsync: updateTodo } = useUpdateTodo();
	const { mutateAsync: deleteTodo } = useDeleteTodo();

	useEffect(() => {
		refetch();
	}, [filters, page, refetch]);

	const handleFiltersChange = useCallback(
		(newFilters) => {
			const cleanFilters = Object.entries(newFilters).reduce(
				(acc, [key, value]) =>
					value !== undefined ? { ...acc, [key]: value } : acc,
				{},
			);
			setSearchParams(cleanFilters);
			setPage(1);
		},
		[setSearchParams],
	);

	const handlePageChange = useCallback((newPage: number) => {
		setPage(newPage);
	}, []);

	const handleUpdateTodo = useCallback(
		async (updatedTodo: Todo) => {
			const updatedTodoWithoutUserId = omit(updatedTodo, 'userId');
			await updateTodo({
				id: updatedTodoWithoutUserId.id,
				data: updatedTodoWithoutUserId,
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

	const { todos, totalCount } = data || {};

	return (
		<DashboardContainer>
			<FiltersSection
				filters={filters}
				setFilters={handleFiltersChange}
			/>
			<TodoContainer
				todos={todos}
				totalCount={totalCount}
				currentPage={page}
				pageSize={PAGE_SIZE}
				onPageChange={handlePageChange}
				handleUpdateTodo={handleUpdateTodo}
				handleDeleteTodo={handleDeleteTodo}
			/>
		</DashboardContainer>
	);
};

export default Dashboard;
