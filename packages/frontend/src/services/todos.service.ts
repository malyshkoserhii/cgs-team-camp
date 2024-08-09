import { AxiosResponse } from 'axios';

import { Todo } from '~typings/todo.types';
import { HttpService } from '~services/http.service';
import { API_KEYS } from '~shared/keys';

interface TodosParams {
	search?: string;
	isCompleted?: 'completed' | 'active';
	isPrivate?: 'private' | 'public';
	page?: number;
	pageSize?: number;
}

interface TodoResponse {
	todos: Todo[];
	pagination: {
		total: number;
		page: number;
		pageSize: number;
		totalPages: number;
	};
}

export class TodosService extends HttpService {
	constructor() {
		super();
	}

	public async getTodos(
		search?: string,
		isCompleted?: 'completed' | 'active',
		isPrivate?: 'private' | 'public',
		page?: number,
		pageSize?: number,
	): Promise<AxiosResponse<TodoResponse>> {
		let params: TodosParams = {};

		if (search) params.search = search;
		if (isCompleted) params.isCompleted = isCompleted;
		if (isPrivate) params.isPrivate = isPrivate;
		if (page) params.page = page;
		if (pageSize) params.pageSize = pageSize;

		return this.get({ url: API_KEYS.ALL, params }, true);
	}

	public async createTodo(todo: Todo): Promise<AxiosResponse<Todo>> {
		return this.post({ url: API_KEYS.CREATE, data: todo }, true);
	}

	public async getTodoById(id: string): Promise<AxiosResponse<Todo>> {
		return this.get({ url: API_KEYS.BY_ID(id) }, true);
	}

	public async updateTodo(
		id: string,
		todo: Todo,
	): Promise<AxiosResponse<Todo>> {
		return this.put({ url: API_KEYS.BY_ID(id), data: todo }, true);
	}

	public async deleteTodo(id: string): Promise<AxiosResponse<void>> {
		return this.delete({ url: API_KEYS.BY_ID(id) }, true);
	}

	public async patchTodoById(
		id: string,
		data: Partial<Todo>,
	): Promise<AxiosResponse<Todo>> {
		return this.patch({ url: API_KEYS.BY_ID(id), data }, true);
	}
}

export const todosService = new TodosService();
