import { useState } from 'react';
import { useDebouncedCallback } from '~shared/hooks/useDebouncedCallback.hook';
import { useFilter } from '~shared/ui/filter/model/useFilter.hook';
import { useTodoStore } from '~store/todos.store';

export const useShowMore = (): (() => void) => {
	const { hasMore, showMoreIsLoading } = useTodoStore();
	const { onUpdateFilter } = useFilter();
	const [page, setPage] = useState<number>(1);

	const showMore = (): void => {
		if (hasMore && !showMoreIsLoading) {
			setPage((prev) => prev + 1);
			onUpdateFilter({ page: page + 1, showMore: 'true' });
		}
	};

	return useDebouncedCallback(showMore, 500);
};
