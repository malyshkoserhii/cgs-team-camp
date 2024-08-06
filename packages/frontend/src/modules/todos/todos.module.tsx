import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, ButtonGroup } from '@blueprintjs/core';
import { toast } from 'react-toastify';

import { useTodoStore } from '~store/todo.store';
import { Loader, StyledNavLink } from '~shared/components';
import { FILTER_KEYS, ROUTER_KEYS } from '~shared/keys';
import { TodoList } from '~modules/todos/TodoList/TodoList';
import {
	buttonGroupStyle,
	container,
	searchInputStyle,
	wrapper,
	wrapperFlex,
} from '~modules/todos/todos.styles';

export const TodosModule = (): React.ReactNode => {
	const { todos, getTodos, loading, error } = useTodoStore();
	const [searchFilter, setSearchFilter] = useState('');
	const [filter, setFilter] = useState<FILTER_KEYS>(FILTER_KEYS.ALL);

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setSearchFilter(e.target.value);
	};

	const handleFilterChange = (newFilter: FILTER_KEYS): void => {
		setFilter(newFilter);
	};

	useEffect(() => {
		getTodos();
	}, [getTodos]);

	useEffect(() => {
		if (searchFilter) {
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
			</div>
			<ButtonGroup className={buttonGroupStyle}>
				<Button
					active={filter === FILTER_KEYS.ALL}
					onClick={() => handleFilterChange(FILTER_KEYS.ALL)}
				>
					All
				</Button>
				<Button
					active={filter === FILTER_KEYS.COMPLETED}
					onClick={() => handleFilterChange(FILTER_KEYS.COMPLETED)}
				>
					Completed
				</Button>
				<Button
					active={filter === FILTER_KEYS.PRIVATE}
					onClick={() => handleFilterChange(FILTER_KEYS.PRIVATE)}
				>
					Private
				</Button>
				<Button
					active={filter === FILTER_KEYS.PUBLIC}
					onClick={() => handleFilterChange(FILTER_KEYS.PUBLIC)}
				>
					Public
				</Button>
			</ButtonGroup>

			{!loading && !error && <TodoList filteredTodos={todos} />}
			{loading && <Loader loading={loading} />}
			{error && toast.error(error.message)}
		</div>
	);
};
