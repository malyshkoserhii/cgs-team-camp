export interface ITodo {
	id?: number;
	title: string;
	description: string;
	private: boolean;
	completed: boolean;
	creatorId?: number;
}

export interface ITodoCreate extends Omit<ITodo, 'id'> {}

export interface TodoFilters {
	search: string;
	filter: TodoFiltersParams[];
	page: number;
	maxPages: number;
}

export enum TodoFiltersParams {
	PRIVATE = 'private',
	COMPLETED = 'completed',
	ALL = '',
}
