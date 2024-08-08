import { AxiosResponse } from 'axios';

import { Todo } from '~typings/todo.types';
import { HttpService } from '~services/http.service';
import { API_KEYS } from '~shared/keys';

export class TodosService extends HttpService {
	constructor() {
		super();
	}

	public async getTodos(
		search?: string,
		isCompleted?: boolean,
		isPrivate?: boolean,
	): Promise<AxiosResponse<Todo[]>> {
		const params: Record<string, any> = { search };
		if (isCompleted !== undefined) {
			params.isCompleted = isCompleted;
		}
		if (isPrivate !== undefined) {
			params.isPrivate = isPrivate;
		}
		return this.get(
			{ url: API_KEYS.ALL, params: { search, isCompleted, isPrivate } },
			true,
		);
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
