import { ITodo, TodoFilters } from './todos.type';

export interface GetExistRequest {
	params: {
		id: string;
	};
}
export interface CreateTodoRequest extends Express.Request {
	body: ITodo;
}

export interface GetTodoRequestQuery {
	filter: TodoFilters;
	search: string;
	page: number;
}

export interface GetTodoRequest extends Express.Request, GetExistRequest {}

export interface UpdateTodoRequest extends CreateTodoRequest, GetTodoRequest {}
