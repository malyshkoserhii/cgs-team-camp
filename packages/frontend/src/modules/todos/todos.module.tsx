import React, { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useTodoStore } from '~store/todo.store';
import { FILTER_KEYS, ROUTER_KEYS } from '~shared/keys';
import { FilterSelect, Loader, StyledNavLink } from '~shared/components';
import { TodoList } from '~modules/todos/TodoList/TodoList';
import {
	container,
	searchInputStyle,
	wrapper,
	wrapperFlex,
} from '~modules/todos/todos.styles';

export const TodosModule = (): React.ReactNode => {
	const { todos, getTodos, loading, error, pagination } = useTodoStore();
	const [searchFilter, setSearchFilter] = useState('');
	const [filter, setFilter] = useState<FILTER_KEYS>(FILTER_KEYS.ALL);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setSearchFilter(e.target.value);
	};

	const handleFilterChange = (newFilter: FILTER_KEYS): void => {
		setFilter(newFilter);
	};

	const handleNextPage = (): void => {
		if (pagination && page < pagination.totalPages) {
			setPage(page + 1);
		}
	};

	const handlePreviousPage = (): void => {
		if (page > 1) {
			setPage(page - 1);
		}
	};

	useEffect(() => {
		const statusPrivate =
			filter === FILTER_KEYS.PRIVATE
				? 'private'
				: filter === FILTER_KEYS.PUBLIC
					? 'public'
					: undefined;

		const statusCompleted =
			filter === FILTER_KEYS.COMPLETED
				? 'completed'
				: filter === FILTER_KEYS.ACTIVE
					? 'active'
					: undefined;

		getTodos(searchFilter, statusCompleted, statusPrivate, page, pageSize);
	}, [getTodos, searchFilter, filter, page, pageSize]);

	useEffect(() => {
		if (searchFilter && todos.length === 0) {
			toast.warning('No todos match this filter');
		}
	}, [searchFilter]);

	return (
		<div className={container}>
			<div className={wrapperFlex}>
				<div className={wrapper}>
					<input
						type="text"
						placeholder="Search todos..."
						value={searchFilter}
						onChange={handleSearchChange}
						className={searchInputStyle}
					/>
					<StyledNavLink to={ROUTER_KEYS.ADD_NEW}>
						Add new
					</StyledNavLink>
				</div>

				<FilterSelect
					selectedFilter={filter}
					onFilterChange={handleFilterChange}
				/>
			</div>

			{!loading && !error && (
				<>
					<TodoList
						filteredTodos={todos}
						handleNextPage={handleNextPage}
						handlePreviousPage={handlePreviousPage}
					/>
				</>
			)}
			{loading && <Loader loading={loading} />}
			{error && toast.error(error.message)}
		</div>
	);
};
