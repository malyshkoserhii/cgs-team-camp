import { ReactElement, useEffect } from 'react';
import { useAuth } from '~shared/hooks/useAuth.hook';
import { TodoI } from '~shared/interfaces/todo.interface';
import { TodoFormModel } from '~shared/models/todo.model';
import { TodoFilterModel } from '~shared/models/todoFilter.model';
import { Heading } from '~shared/ui/base/heading';
import { useFilter } from '~shared/ui/filter/model/useFilter.hook';
import { Filter } from '~shared/ui/filter/ui/filter.component';
import { AppGrid } from '~shared/ui/grid';
import { Loader } from '~shared/ui/loader';
import { NotFoundBox } from '~shared/ui/notFoundBox/notFoundBox.component';
import { TodoItem } from '~shared/ui/todo';
import { useTodoStore } from '~store/todos.store';
import { filterOptions, filterOptionsWithAuth } from '../model/filterOptions';
import { filterBoxStyles, headingStyle, listBoxStyle } from './todoList.styles';

export const TodoList = (): ReactElement => {
	const { items, loading, fetchTodos } = useTodoStore();
	const { params } = useFilter<TodoFormModel>();
	const { isAuth } = useAuth();

	useEffect(() => {
		fetchTodos(params);
	}, [fetchTodos, JSON.stringify(params)]);

	if (loading) {
		return <Loader fullHeight />;
	}

	return (
		<>
			<div className={filterBoxStyles}>
				<Heading className={headingStyle} level={2}>
					Filters
				</Heading>
				<Filter
					options={isAuth ? filterOptionsWithAuth : filterOptions}
					defaultValues={new TodoFilterModel(params)}
				/>
			</div>
			<div className={listBoxStyle}>
				<Heading className={headingStyle}>Tasks</Heading>
				{items?.length === 0 ? (
					<NotFoundBox withCode={false} />
				) : (
					<AppGrid<TodoI> items={items || []} renderItem={TodoItem} />
				)}
			</div>
		</>
	);
};
