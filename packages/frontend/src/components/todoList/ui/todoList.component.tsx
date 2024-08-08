import { ReactElement, useEffect } from 'react';
import { useAuth } from '~shared/hooks/useAuth.hook';
import { useFetchTodos } from '~shared/hooks/useFetchTodos.hook';
import { TodoI } from '~shared/interfaces/todo.interface';
import { TodoFilterModel } from '~shared/models/todoFilter.model';
import { Flex } from '~shared/ui/base/flex';
import { Heading } from '~shared/ui/base/heading';
import { Filter } from '~shared/ui/filter/ui/filter.component';
import { AppGrid } from '~shared/ui/grid';
import { Loader } from '~shared/ui/loader';
import { NotFoundBox } from '~shared/ui/notFoundBox/notFoundBox.component';
import { Pagination } from '~shared/ui/paginator';
import { TodoItem } from '~shared/ui/todo';
import { TodoCounter } from '~shared/ui/todo/todoCounter';
import { filterOptions, filterOptionsWithAuth } from '../model/filterOptions';
import { filterBoxStyles, headingStyle, listBoxStyle } from './todoList.styles';

export const TodoList = (): ReactElement => {
	const { isAuth } = useAuth();
	const {
		items,
		totalPages,
		fetchTodos,
		showMoreIsLoading,
		loading,
		params,
		totalResults,
	} = useFetchTodos();

	useEffect(() => {
		fetchTodos();
	}, [fetchTodos, params]);

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
					resetValues={new TodoFilterModel()}
					withResetButton
				/>
			</div>
			<div className={listBoxStyle}>
				<Flex justify="space-between">
					<Heading className={headingStyle}>Tasks</Heading>
					<TodoCounter />
				</Flex>
				{items?.length === 0 ? (
					<NotFoundBox
						message="Nothing found by your query."
						withCode={false}
					/>
				) : (
					<AppGrid<TodoI>
						items={items || []}
						renderItem={TodoItem}
						showMoreIsLoading={showMoreIsLoading}
					/>
				)}
				{items?.length !== 0 && (
					<Pagination
						totalResults={totalResults}
						initialPage={params.page}
						totalPages={totalPages}
					/>
				)}
			</div>
		</>
	);
};
