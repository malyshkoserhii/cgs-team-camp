import { apiRoutes } from '~/api/api.routes';
import { HttpService } from './http.service';

import type { Todo } from '~typings/todo';

export class TodoService extends HttpService {
	private readonly apiRoute = apiRoutes.todos;

	constructor(baseUrl?: string) {
		super(baseUrl);
	}

	async createTodo(todo: Omit<Todo, 'id'>) {
		return this.post({
			apiRoute: this.apiRoute,
			data: todo,
		});
	}

	async getAllTodos() {
		return this.get({
			apiRoute: this.apiRoute,
		});
	}

	async getTodoById(id: string) {
		return this.get({
			apiRoute: `${this.apiRoute}/${id}`,
		});
	}

	async updateTodo(id: string, updates: Partial<Todo>) {
		return this.put({
			apiRoute: `${this.apiRoute}/${id}`,
			data: updates,
		});
	}

	async deleteTodo(id: string) {
		return this.delete({
			apiRoute: `${this.apiRoute}/${id}`,
		});
	}
}
