import { useCallback } from 'react';
import { TodoI } from '~shared/interfaces/todo.interface';
import { TodoFilterModel } from '~shared/models/todoFilter.model';
import { useFilter } from '~shared/ui/filter/model/useFilter.hook';
import { useTodoStore } from '~store/todos.store';

interface UseTodoStore {
	items: TodoI[];
	totalPages: number;
	fetchTodos: () => void;
	showMoreTodos: (params: TodoFilterModel) => void;
	showMoreIsLoading: boolean;
	loading: boolean;
}

export const useFetchTodos = (): Partial<
	UseTodoStore & { params: TodoFilterModel }
> => {
	const { params } = useFilter<TodoFilterModel>();
	const {
		items,
		totalPages,
		fetchTodos: fetch,
		showMoreTodos,
		showMoreIsLoading,
		loading,
	} = useTodoStore();

	const fetchTodos = useCallback((): void => {
		if (params.showMore) {
			showMoreTodos(params);
		} else {
			fetch(params);
		}
	}, [params, showMoreTodos, fetch]);

	return {
		items,
		totalPages,
		fetchTodos,
		showMoreIsLoading,
		loading,
		params,
	};
};
