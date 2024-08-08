import { TodoItem } from '@prisma/client';
export type TodoType = TodoItem;
export type CreateTodoType = Omit<TodoItem, 'id'>;
export type UpdateTodoType = Partial<TodoItem>;
export type GetAllTodosType = {
	isLastPage: boolean;
	todos: TodoType[];
	pages: number;
};

export type GetAllTodoQuery = {
	search?: string;
	isPrivate?: boolean;
	isCompleted?: boolean;
	page?: number;
};
