import React from 'react';

import { Todo } from '~typings/todo.types';
import { TodoItem } from '~modules/todos/TodoItem/TodoItem';
import { btnAddNewStyle } from '~modules/todos/TodoList/TodoList.styles';
import { NavLink } from 'react-router-dom';

export const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => {
	console.log('TodoList: ', todos);

	return (
		<div>
			<div className={btnAddNewStyle}>
				<NavLink to={'/add'}>'Add new'</NavLink>
			</div>
			{todos.map((item) => (
				<TodoItem key={item.id} todo={item} />
			))}
		</div>
	);
};
