export interface ITodo {
	title: string;
	description: string;
	completed: boolean;
	private: boolean;
	creatorId: number;
}

export enum TodoFilters {
	PRIVATE = 'private',
	COMPLETED = 'completed',
	ALL = '',
}
