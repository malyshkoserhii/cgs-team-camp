import { create } from 'zustand';
import { buildQueryString } from '~/utils';
import { TodoFilters, TodoFiltersParams } from '~shared/types/todo/todo.types';

export interface IFilterStore {
	data: TodoFilters;
	setFilter: (filter: TodoFilters) => void;
	setDefaultFilter: () => void;
}

const searchParams = new URLSearchParams(window.location.search);

export const useFilterStore = create<IFilterStore>((set) => ({
	data: {
		filter:
			(searchParams.get('filter')?.split(',') as TodoFiltersParams[]) ||
			[],
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
}));
