import { AxiosResponse } from 'axios';

import { Todo } from '~typings/todo.types';
import { API_KEYS } from '~shared/keys';
import { HttpService } from '~services/http.service';

export class TodosService extends HttpService {
	constructor() {
		super();
	}

	public async getTodos(): Promise<AxiosResponse<Todo[]>> {
		return this.get({ url: API_KEYS.ALL }, false);
	}

	public async createTodo(todo: Todo): Promise<AxiosResponse<Todo>> {
		return this.post({ url: API_KEYS.CREATE, data: todo }, false);
	}

	public async getTodoById(id: string): Promise<AxiosResponse<Todo>> {
		return this.get({ url: API_KEYS.BY_ID(id) }, false);
	}

	public async updateTodo(
		id: string,
		todo: Todo,
	): Promise<AxiosResponse<Todo>> {
		return this.put({ url: API_KEYS.BY_ID(id), data: todo }, false);
	}

	public async deleteTodo(id: string): Promise<AxiosResponse<void>> {
		return this.delete({ url: API_KEYS.BY_ID(id) }, false);
	}
}
