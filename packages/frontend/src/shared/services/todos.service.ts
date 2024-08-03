import { AxiosResponse } from 'axios';

import { ApiTodoEndpoints } from '~shared/keys/api-keys';

import {
	CreateTodoType,
	GetAllTodoType,
	Todo,
	UpdateTodoType,
} from '~shared/types/Todo.types';
import HttpService from './http.service';

class TodosService extends HttpService {
	constructor() {
		super();
	}

	public async getTodoById(id: number): Promise<AxiosResponse<Todo>> {
		return this.get({ url: ApiTodoEndpoints.GETTODOBYID(id) }, false);
	}

	public async fetchAllTodos(): Promise<AxiosResponse<GetAllTodoType>> {
		return this.get({ url: ApiTodoEndpoints.ALL }, false);
	}

	public async createTodo(
		todo: CreateTodoType,
	): Promise<AxiosResponse<Todo>> {
		return this.post({ url: ApiTodoEndpoints.CREATE, data: todo }, false);
	}

	public async updateTodo(
		id: number,
		todo: UpdateTodoType,
	): Promise<AxiosResponse<Todo>> {
		return this.put(
			{ url: ApiTodoEndpoints.GETTODOBYID(id), data: todo },
			false,
		);
	}

	public async removeTodo(id: number): Promise<AxiosResponse<Todo>> {
		return this.delete({ url: ApiTodoEndpoints.GETTODOBYID(id) }, false);
	}
}

export default TodosService;
