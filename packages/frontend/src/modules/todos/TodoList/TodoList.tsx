import React, { ChangeEvent, useState } from 'react';

import { Todo } from '~typings/todo.types';
import { TodoItem } from '~modules/todos/TodoItem/TodoItem';
import {
	wrapper,
	buttonGroupStyle,
	searchInputStyle,
} from '~modules/todos/TodoList/TodoList.styles';
import { ROUTER_KEYS } from '~shared/keys';
import { StyledNavLink } from '~shared/components';
import Button from '~shared/components/button/button.component';

export const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => {
	const [searchFilter, setSearchFilter] = useState('');
	const [filter, setFilter] = useState<
		'All' | 'Completed' | 'Private' | 'Public'
	>('All');

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

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setSearchFilter(e.target.value);
	};

	return (
		<div>
			<div className={wrapper}>
				<input
					type="text"
					placeholder="Search todos..."
					value={searchFilter}
					onChange={handleSearchChange}
					className={searchInputStyle}
				/>
				<StyledNavLink to={ROUTER_KEYS.ADD_NEW}>Add new</StyledNavLink>
			</div>
			<div className={buttonGroupStyle}>
				<Button text={'All'} onClick={() => setFilter('All')} />
				<Button
					text={'Completed'}
					onClick={() => setFilter('Completed')}
				/>
				<Button text={'Private'} onClick={() => setFilter('Private')} />
				<Button text={'Public'} onClick={() => setFilter('Public')} />
			</div>

			{filteredTodos.map((item) => (
				<TodoItem key={item.id} todo={item} />
			))}
		</div>
	);
};
