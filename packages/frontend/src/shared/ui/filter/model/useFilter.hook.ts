import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { decodeSearchParams, FilterKeys } from '~shared/helpers/searchParams';
import { useAuth } from '~shared/hooks/useAuth.hook';

export interface OnUpdateOptions {
	resetPage?: boolean;
}

interface UseFilterReturn<T> {
	params: T;
	onUpdateFilter: (
		filters: Partial<FilterKeys>,
		options?: OnUpdateOptions,
	) => void;
	onResetFilter: () => void;
}

export const useFilter = <T>(): UseFilterReturn<T> => {
	const { isAuth } = useAuth();
	const [searchParams, setSearchParams] = useSearchParams();
	const params = decodeSearchParams(searchParams) as T;
	const navigate = useNavigate();

	const onUpdateFilter = useCallback(
		(
			filters: Partial<FilterKeys>,
			options: OnUpdateOptions = { resetPage: false },
		) => {
			if (!isAuth) {
				delete filters.isPrivate;
			}

			const flattenedData = Object.entries(filters).reduce(
				(acc, [key, value]) => {
					if (
						typeof value === 'object' &&
						!Array.isArray(value) &&
						value !== null
					) {
						return { ...acc, ...(value as object) };
					}
					return { ...acc, [key]: value };
				},
				{},
			);

			const newFilters = options.resetPage
				? { ...flattenedData, page: 1 }
				: flattenedData;

			setSearchParams(new URLSearchParams(newFilters));

			if (options.resetPage) {
				navigate({ search: `?${new URLSearchParams(newFilters)}` });
			}
		},
		[setSearchParams, navigate],
	);

	const onResetFilter = useCallback((): void => {
		setSearchParams({});
	}, [setSearchParams]);

	return { onUpdateFilter, onResetFilter, params };
};
