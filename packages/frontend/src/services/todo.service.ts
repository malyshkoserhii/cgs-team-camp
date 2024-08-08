import { apiRoutes } from '~/api/api.routes';
import { HttpService } from './http.service';

import type { Todo } from '~typings/todo';
import type { FilterQueryParams } from '~typings/api';

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

	async getAllTodos(
		filters: FilterQueryParams,
		page: number,
		pageSize: number,
	) {
		return this.get({
			apiRoute: this.apiRoute,
			params: {
				...filters,
				page,
				pageSize,
			},
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
