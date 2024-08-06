import React from 'react';
import { ITodo } from '~shared/interfaces/todo.interface';
import TodoItem from '../todoItem/todoItem.component';
import { todoListStyles } from './todoList.styles';
import { useMediaQuery } from 'react-responsive';
import { THEME } from '~shared/styles/constants';
import TodoSlider from '../todoSlider/todoSlider.component';

interface ITodoList {
	todos: ITodo[];
}

const TodoList = ({ todos }: ITodoList): React.ReactNode => {
	const isDesktop = useMediaQuery({
		query: `(min-width: ${THEME.BREAKPOINTS.DESKTOP})`,
	});

	const isTablet = useMediaQuery({
		minWidth: THEME.BREAKPOINTS.MOBILE,
		maxWidth: THEME.BREAKPOINTS.DESKTOP,
	});

	return (
		<div>
			{isTablet ? (
				<TodoSlider todos={todos} />
			) : (
				<ul className={todoListStyles(isDesktop)}>
					{todos.map((todo) => (
						<TodoItem key={todo.id} todo={todo} />
					))}
				</ul>
			)}
		</div>
	);
};

export default TodoList;
