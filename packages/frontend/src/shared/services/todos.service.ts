import { AxiosResponse } from 'axios';

import { ApiTodoEndpoints } from '~shared/keys/api-keys';

import {
	CreateTodoType,
	GetAllTodoQueryType,
	GetAllTodoType,
	Todo,
	UpdateTodoType,
} from '~shared/types/todo.types';
import HttpService from './http.service';

class TodosService extends HttpService {
	constructor() {
		super();
	}

	public async getTodoById(id: number): Promise<AxiosResponse<Todo>> {
		return await this.get({ url: ApiTodoEndpoints.GETTODOBYID(id) }, true);
	}

	public async fetchAllTodos(
		query: GetAllTodoQueryType,
	): Promise<AxiosResponse<GetAllTodoType>> {
		return await this.get(
			{ url: ApiTodoEndpoints.ALL, params: query },
			true,
		);
	}

	public async createTodo(
		todo: CreateTodoType,
	): Promise<AxiosResponse<Todo>> {
		return await this.post(
			{ url: ApiTodoEndpoints.CREATE, data: todo },
			true,
		);
	}

	public async updateTodo(
		id: number,
		todo: UpdateTodoType,
	): Promise<AxiosResponse<Todo>> {
		return await this.put(
			{ url: ApiTodoEndpoints.GETTODOBYID(id), data: todo },
			true,
		);
	}

	public async removeTodo(id: number): Promise<AxiosResponse<Todo>> {
		return await this.delete(
			{ url: ApiTodoEndpoints.GETTODOBYID(id) },
			true,
		);
	}
}

export default TodosService;
