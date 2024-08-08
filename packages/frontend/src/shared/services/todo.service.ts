import { HttpService } from './http.service';
import { Todo } from '../types/todo.type';
import { todoFilters } from '~shared/types/todoFilters.type';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
	throw new Error('VITE_API_URL is not defined in the environment variables');
}

export class TodoService extends HttpService {
	constructor() {
		super(API_URL);
	}

	async getTodos(filters?: Partial<todoFilters>): Promise<Todo[]> {
		const params = new URLSearchParams();
		if (filters) {
			if (filters.search) params.append('search', filters.search);
			if (filters.status) params.append('status', filters.status);
			if (filters.public !== undefined)
				params.append('public', filters.public.toString());
		}

		const queryString = params.toString();
		const url = `/todos/all${queryString ? `?${queryString}` : ''}`;

		return this.get<Todo[]>(url);
	}

	async getMyTodos(): Promise<Todo[]> {
		const todos = this.get<Todo[]>('/todos/my');
		return todos;
	}

	async addTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
		return this.post<Todo>('/todos', todo);
	}

	async updateTodo(
		id: number,
		updates: Partial<Omit<Todo, 'id'>>,
	): Promise<Todo> {
		return this.put<Todo>(`/todos/${id}`, updates);
	}

	async deleteTodo(id: number): Promise<void> {
		return this.delete(`/todos/${id}`);
	}
}

export const todoService = new TodoService();
