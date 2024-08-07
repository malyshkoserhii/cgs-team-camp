import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
export type useFilteredTodosType = {
	filter: string;
	isPrivate: string;
	isCompleted: string;
	updateSearchParams: (params: Record<string, string | null>) => void;
	clearSearchParams: () => void;
};

const useFilteredTodos = (): useFilteredTodosType => {
	const [searchParams, setSearchParams] = useSearchParams();
	const isPrivate = searchParams.get('isPrivate');
	const isCompleted = searchParams.get('isCompleted');
	const filter = searchParams.get('search');

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
		clearSearchParams,
	};
};
export default useFilteredTodos;
