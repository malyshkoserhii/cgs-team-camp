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

type SearchParams =
	| string
	| URLSearchParams
	| string[][]
	| Record<string, string>;

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

			const currentParams = Object.fromEntries(searchParams.entries());
			const newFilters = options.resetPage
				? { ...currentParams, ...filters, page: 1 }
				: { ...currentParams, ...filters };
			const filteredParams = Object.fromEntries(
				Object.entries(newFilters).filter(
					([_, value]) => value != null,
				),
			);

			const newSearchParams = new URLSearchParams(
				filteredParams as SearchParams,
			);
			setSearchParams(newSearchParams);

			if (options.resetPage) {
				navigate({ search: `?${newSearchParams.toString()}` });
			}
		},
		[isAuth, searchParams, setSearchParams, navigate],
	);

	const onResetFilter = useCallback((): void => {
		setSearchParams({});
	}, [setSearchParams]);

	return { onUpdateFilter, onResetFilter, params };
};
