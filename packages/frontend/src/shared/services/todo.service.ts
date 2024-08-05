import { HttpService } from './http.service';
import { Todo } from '../types/types';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
	throw new Error('VITE_API_URL is not defined in the environment variables');
}

export class TodoService extends HttpService {
	constructor() {
		super(API_URL);
	}

	async getTodos(): Promise<Todo[]> {
		console.log('getting todos');
		return this.get<Todo[]>('/todos/all');
	}

	async addTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
		return this.post<Todo>('/todos', todo);
	}

	async updateTodo(
		id: number,
		updates: Partial<Omit<Todo, 'id'>>,
	): Promise<Todo> {
		console.log('updating todo', id, updates);
		return this.put<Todo>(`/todos/${id}`, updates);
	}

	async deleteTodo(id: number): Promise<void> {
		return this.delete(`/todos/${id}`);
	}
}

export const todoService = new TodoService();
