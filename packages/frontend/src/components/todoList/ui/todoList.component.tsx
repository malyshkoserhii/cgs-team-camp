import { ReactElement, useEffect } from 'react';
import { TodoI } from '~shared/interfaces/todo.interface';
import { TodoFormModel } from '~shared/models/todo.model';
import { TodoFilterModel } from '~shared/models/todoFilter.model';
import { Heading } from '~shared/ui/base/heading';
import { useFilter } from '~shared/ui/filter/model/useFilter.hook';
import { Filter } from '~shared/ui/filter/ui/filter';
import { AppGrid } from '~shared/ui/grid';
import { Loader } from '~shared/ui/loader';
import { TodoItem } from '~shared/ui/todo';
import { useTodoStore } from '~store/todos.store';
import { filterOptions } from '../model/filterOptions';
import { headingStyle, listBoxStyle } from './todoList.styles';

export const TodoList = (): ReactElement => {
	const { items, loading, fetchTodos } = useTodoStore();
	const { params } = useFilter<TodoFormModel>();

	useEffect(() => {
		fetchTodos(params);
	}, [fetchTodos]);

	if (loading) {
		return <Loader fullHeight />;
	}

	return (
		<>
			<Filter
				options={filterOptions}
				defaultValues={new TodoFilterModel(params)}
			/>
			<div className={listBoxStyle}>
				<Heading className={headingStyle}>Tasks</Heading>
				<AppGrid<TodoI> items={items || []} renderItem={TodoItem} />
			</div>
		</>
	);
};
