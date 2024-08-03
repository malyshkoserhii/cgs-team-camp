export interface Todo {
	id: number;
	title: string;
	description: string;
	completed: boolean;
}

export interface CreateTodoType {
	title: string;
	description: string;
	completed: boolean;
}

export interface UpdateTodoType {
	title?: string;
	description?: string;
	completed?: boolean;
}

export interface ApiResponse<T> {
	data: T;
}

export type GetAllTodoType = Todo[];
