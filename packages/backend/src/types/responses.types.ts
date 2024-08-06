import { Todo } from '@prisma/client';

export interface Status {
	message?: string;
}

export interface Pages {
	pages: number;
}

export interface GetTodosResponse extends Status, Pages {
	data: Todo[];
}

export interface GetTodoResponse extends Status {
	data: Todo;
}
