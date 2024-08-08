import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { todoFilters } from '~shared/types/todoFilters.type';
import { useTodoStore } from '~store/todo.store';
import { useUserStore } from '~store/user.store';

export const useInitialData = (): void => {
	const location = useLocation();
	const { fetchTodos } = useTodoStore();
	const { getUser } = useUserStore();

	useEffect(() => {
		const loadInitialData = async (): Promise<void> => {
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

			await Promise.all([fetchTodos(currentFilters), getUser()]);
		};

		loadInitialData();
	}, [fetchTodos, getUser, location.search]);
};
