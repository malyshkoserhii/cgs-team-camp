import { Todo } from '@prisma/client';
import { IUser, IUserSession } from './user.type';

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
