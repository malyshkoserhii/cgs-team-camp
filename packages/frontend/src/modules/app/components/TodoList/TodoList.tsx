import React from 'react';
import { useTodoStore } from '~store/todo.store';
import { useUserStore } from '~store/user.store';
import { useMediaQuery } from 'usehooks-ts';
import { THEME } from '~shared/styles/constants';
import { emptyStateStyles } from './TodoList.styles';
import { CarouselView } from './TodoListViews/CarouselView/CarouselView';
import { ListView } from './TodoListViews/ListView/ListView';
import { TableView } from './TodoListViews/TableView/TableView';
import { DisplayType } from '~shared/types/display.type';

export const TodoList: React.FC = () => {
	const { todos, pagination, fetchTodos } = useTodoStore();
	const user = useUserStore((state) => state.user);

	const isDesktop = useMediaQuery(
		`(min-width: ${THEME.BREAKPOINTS.DESKTOP})`,
	);
	const isTablet = useMediaQuery(
		`(min-width: ${THEME.BREAKPOINTS.TABLET}) and (max-width: ${THEME.BREAKPOINTS.DESKTOP})`,
	);

	const getViewType = (): DisplayType => {
		if (isDesktop) return DisplayType.DESKTOP;
		if (isTablet) return DisplayType.TABLET;
		return DisplayType.PHONE;
	};

	const viewType = getViewType();

	if (todos.length === 0) {
		return (
			<div className={emptyStateStyles}>
				No todos found. Add a new one!
			</div>
		);
	}

	const handleLoadMore = (): void => {
		if (pagination.page < pagination.totalPages) {
			fetchTodos(undefined, pagination.page + 1, 3, true);
		}
	};

	const hasMoreTodos = pagination.page < pagination.totalPages;

	const viewComponents = {
		[DisplayType.DESKTOP]: <TableView todos={todos} userId={user.id} />,
		[DisplayType.TABLET]: (
			<CarouselView
				todos={todos}
				userId={user.id}
				onLoadMore={handleLoadMore}
				hasMoreTodos={hasMoreTodos}
			/>
		),
		[DisplayType.PHONE]: (
			<ListView
				todos={todos}
				userId={user.id}
				onLoadMore={handleLoadMore}
				hasMoreTodos={hasMoreTodos}
			/>
		),
	};

	return viewComponents[viewType];
};
