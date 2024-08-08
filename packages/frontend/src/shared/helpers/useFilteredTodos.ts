import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
export type useFilteredTodosType = {
	filter: string;
	isPrivate: string;
	isCompleted: string;
	updateSearchParams: (params: Record<string, string | null>) => void;
	clearSearchParams: () => void;
	page: string;
};

const useFilteredTodos = (): useFilteredTodosType => {
	const [searchParams, setSearchParams] = useSearchParams();
	const isPrivate = searchParams.get('isPrivate');
	const isCompleted = searchParams.get('isCompleted');
	const filter = searchParams.get('search');
	const page = searchParams.get('page') || '1';

	const updateSearchParams = useCallback(
		(params: Record<string, string | null>): void => {
			const newSearchParams = new URLSearchParams(searchParams);
			Object.entries(params).forEach(([key, value]) => {
				if (value) {
					newSearchParams.set(key, value);
				} else {
					newSearchParams.delete(key);
				}
			});

			if (params.search || params.isPrivate || params.isCompleted) {
				newSearchParams.set('page', '1');
			}

			setSearchParams(newSearchParams);
		},
		[searchParams, setSearchParams],
	);
	const clearSearchParams = useCallback((): void => {
		setSearchParams('');
	}, [setSearchParams]);

	return {
		filter,
		isPrivate,
		isCompleted,
		updateSearchParams,
		page,
		clearSearchParams,
	};
};
export default useFilteredTodos;
