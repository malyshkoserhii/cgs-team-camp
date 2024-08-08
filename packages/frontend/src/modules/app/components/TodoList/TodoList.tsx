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
import { ViewType } from '~shared/types/view.type';
import { useUserStore } from '~store/user.store';

export const TodoList: React.FC = () => {
	const todos = useTodoStore((state) => state.todos);
	const user = useUserStore((state) => state.user);
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
			{todos.map((todo) => (
				<TodoElement
					key={todo.id}
					todo={todo}
					view={viewType}
					editable={todo.userId === user.id}
				/>
			))}
		</div>
	);
};
