import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { buildQueryString } from '~/utils';
import { TodoFilters, TodoFiltersParams } from '~shared/types/todo/todo.types';

export interface IFilterStore {
	data: TodoFilters;
	setFilter: (filter: TodoFilters) => void;
	setDefaultFilter: () => void;
	setMaxPages: (maxPages: number) => void;
	setPage: (page: number) => void;
}

const searchParams = new URLSearchParams(window.location.search);

export const useFilterStore = create(
	persist<IFilterStore>(
		(set) => ({
			data: {
				filter:
					(searchParams
						.get('filter')
						?.split(',') as TodoFiltersParams[]) || [],
				search: searchParams.get('search') || '',
				page: Number(searchParams.get('page')) || 1,
				maxPages: 1,
			},
			setFilter: (filter): void => {
				const newUrl = buildQueryString(filter);
				window.history.replaceState(
					null,
					'',
					`${window.location.pathname}?${newUrl}`,
				);

				set(() => ({
					data: filter,
				}));
			},
			setMaxPages: (maxPages: number): void => {
				set((state) => ({
					data: {
						...state.data,
						maxPages,
					},
				}));
			},
			setPage: (page: number): void => {
				set(({ data }) => ({
					data: {
						...data,
						page:
							page <= 0
								? 1
								: page > data.maxPages
									? data.maxPages
									: page,
					},
				}));
			},
			setDefaultFilter(): void {
				const filter = {
					filter: [],
					search: '',
					page: 1,
					maxPages: 1,
				};

				const newUrl = buildQueryString(filter);
				window.history.replaceState(
					null,
					'',
					`${window.location.pathname}?${newUrl}`,
				);

				set(() => ({
					data: filter,
				}));
			},
		}),
		{
			name: 'filter-store',
			partialize: (state) => state,
		},
	),
);
