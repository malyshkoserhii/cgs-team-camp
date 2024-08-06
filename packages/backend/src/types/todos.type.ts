export interface ITodo {
	title: string;
	description: string;
	private: boolean;
	completed: boolean;
	creatorId: number;
}

export enum TodoFilters {
	PRIVATE = 'private',
	COMPLETED = 'completed',
}
