import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { todoFilters } from '~shared/types/todoFilters.type';
import { useTodoStore } from '~store/todo.store';
import { useUserStore } from '~store/user.store';

export const useInitialData = (): void => {
	const location = useLocation();
	const { fetchTodos } = useTodoStore();
	const { getUser } = useUserStore();

	const loadInitialData = useCallback(async () => {
		const searchParams = new URLSearchParams(location.search);
		const isPublic = searchParams.get('public');
		const currentFilters: todoFilters = {
			public: isPublic ? /true/.test(isPublic) : undefined,
			status: searchParams.get('status') as
				| 'completed'
				| 'active'
				| undefined,
			search: searchParams.get('search') || undefined,
		};

		await Promise.all([
			fetchTodos(
				currentFilters,
				parseInt(searchParams.get('page') || '1'),
				parseInt(searchParams.get('pageSize') || '3'),
			),
			getUser(),
		]);
	}, [location.search, fetchTodos, getUser]);

	useEffect(() => {
		loadInitialData();
	}, [loadInitialData]);
};
