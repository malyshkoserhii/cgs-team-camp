import React, { useEffect, useState, ChangeEvent } from 'react';
import { toast } from 'react-toastify';

import { useTodoStore } from '~store/todo.store';
import { Loader, Button, StyledNavLink } from '~shared/components';
import { ROUTER_KEYS } from '~shared/keys';
import { TodoList } from '~modules/todos/TodoList/TodoList';
import {
	container,
	wrapper,
	buttonGroupStyle,
	searchInputStyle,
	wrapperFlex,
} from '~modules/todos/todos.styles';

export const TodosModule = (): React.ReactNode => {
	const { todos, getTodos, loading, error } = useTodoStore();
	const [searchFilter, setSearchFilter] = useState('');
	const [filter, setFilter] = useState<
		'All' | 'Completed' | 'Private' | 'Public'
	>('All');

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setSearchFilter(e.target.value);
	};

	const handleFilterChange = (
		newFilter: 'All' | 'Completed' | 'Private' | 'Public',
	): void => {
		const filteredArray = todos.filter((todo) => {
			if (newFilter === 'Completed' && !todo.isCompleted) return false;
			if (newFilter === 'Private' && !todo.isPrivate) return false;
			if (newFilter === 'Public' && todo.isPrivate) return false;
			return true;
		});

		if (filteredArray.length === 0) {
			toast.warning('No todos match this filter');
		}

		setFilter(newFilter);
	};

	useEffect(() => {
		getTodos();
	}, [getTodos]);

	const filteredTodos = todos.filter((todo) => {
		if (filter === 'Completed' && !todo.isCompleted) return false;
		if (filter === 'Private' && !todo.isPrivate) return false;
		if (filter === 'Public' && todo.isPrivate) return false;
		if (
			searchFilter &&
			!todo.title.toLowerCase().includes(searchFilter.toLowerCase())
		)
			return false;
		return true;
	});

	useEffect(() => {
		if (searchFilter && filteredTodos.length === 0) {
			toast.warning('No todos match this filter');
		}
	}, [searchFilter, filteredTodos]);

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

				<div className={buttonGroupStyle}>
					<Button
						text={'All'}
						onClick={() => handleFilterChange('All')}
					/>
					<Button
						text={'Completed'}
						onClick={() => handleFilterChange('Completed')}
					/>
					<Button
						text={'Private'}
						onClick={() => handleFilterChange('Private')}
					/>
					<Button
						text={'Public'}
						onClick={() => handleFilterChange('Public')}
					/>
				</div>
			</div>

			{!loading && !error && <TodoList filteredTodos={filteredTodos} />}
			{loading && <Loader loading={loading} />}
			{error && toast.error(error.message)}
		</div>
	);
};
