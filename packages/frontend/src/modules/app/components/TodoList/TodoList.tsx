import React from 'react';
import { TodoElement } from '../TodoItem/TodoItem';
import { useTodoStore } from '~store/todo.store';
import {
	emptyStateStyles,
	headerStyles,
	listStyles,
	sliderStyles,
	tableStyles,
} from './TodoList.styles';
import { useMediaQuery } from 'usehooks-ts';
import { THEME } from '~shared/styles/constants';
import { FILTER_TYPES } from '~shared/keys';
import { Todo, ViewType } from '~types/types';

interface TodoListProps {
	filter: string;
}

export const TodoList: React.FC<TodoListProps> = ({ filter }) => {
	const todos = useTodoStore((state) => state.todos);
	const isDesktop = useMediaQuery(
		`(min-width: ${THEME.BREAKPOINTS.DESKTOP})`,
	);
	const isTablet = useMediaQuery(
		`(min-width: ${THEME.BREAKPOINTS.TABLET}) and (max-width: ${THEME.BREAKPOINTS.DESKTOP})`,
	);

	if (todos.length === 0) {
		return (
			<div className={emptyStateStyles}>
				No todos found. Add a new one!
			</div>
		);
	}

	const filterFunctions: Record<FILTER_TYPES, (todo: Todo) => boolean> = {
		[FILTER_TYPES.ALL]: () => true,
		[FILTER_TYPES.PRIVATE]: (todo) => !todo.public,
		[FILTER_TYPES.PUBLIC]: (todo) => todo.public,
		[FILTER_TYPES.COMPLETED]: (todo) => todo.completed,
	};

	const filteredTodos = todos.filter(filterFunctions[filter]);

	const viewStyles: Record<ViewType, string> = {
		table: tableStyles,
		card: sliderStyles,
		list: listStyles,
	};

	const getViewType = (): ViewType => {
		if (isDesktop) return 'table';
		if (isTablet) return 'card';
		return 'list';
	};

	const viewType = getViewType();

	return (
		<div className={viewStyles[viewType]}>
			{viewType === 'table' && (
				<div className={headerStyles}>
					<span>Title</span>
					<span>Description</span>
					<span>Actions</span>
				</div>
			)}
			{filteredTodos.map((todo) => (
				<TodoElement key={todo.id} todo={todo} view={viewType} />
			))}
		</div>
	);
};
