import { ITodo, TodoFilters } from './todos.type';
import { ResetPasswordData } from './token.type';
import { IUser } from './user.type';

export interface CreateTodoRequest extends Express.Request {
	body: ITodo;
}

export interface GetTodoRequestQuery {
	filter: TodoFilters[];
	search: string;
	page: number;
}

export interface GetTodoRequest extends Express.Request {
	params: {
		id: string;
	};
}

export interface UpdateTodoRequest extends CreateTodoRequest, GetTodoRequest {}

export interface CreateUserRequest extends Express.Request {
	body: IUser;
}

export interface LoginUserRequest extends CreateUserRequest {}

export interface ResetPasswordRequest extends Express.Request {
	body: ResetPasswordData;
}

export interface GetExistRequest extends GetTodoRequest, CreateUserRequest {
	route: {
		path: string;
	};
}
