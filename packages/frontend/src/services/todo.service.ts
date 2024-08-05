import HttpService from './http.service';
import { ApiTodoEndpoints } from '~shared/keys/api-keys';
import {
	Todo,
	CreateTodoType,
	UpdateTodoType,
	GetAllTodoType,
} from '~/utils/types';

class TodosService {
	private httpService: HttpService;

	constructor() {
		this.httpService = new HttpService();
	}

	public async fetchAllTodos(): Promise<GetAllTodoType> {
		const response = await this.httpService.get<GetAllTodoType>({
			url: ApiTodoEndpoints.ALL,
		});
		return response.data;
	}

	public async createTodo(newTodo: CreateTodoType): Promise<Todo> {
		const response = await this.httpService.post<Todo>({
			url: ApiTodoEndpoints.CREATE,
			data: newTodo,
		});
		return response.data;
	}

	public async getTodoById(id: number): Promise<Todo> {
		const response = await this.httpService.get<Todo>({
			url: ApiTodoEndpoints.GETBYID(id),
		});
		return response.data;
	}

	public async updateTodo(
		id: number,
		updatedTodo: UpdateTodoType,
	): Promise<Todo> {
		const response = await this.httpService.put<Todo>({
			url: ApiTodoEndpoints.GETBYID(id),
			data: updatedTodo,
		});
		return response.data;
	}

	public async removeTodo(id: number): Promise<void> {
		await this.httpService.delete<void>({
			url: ApiTodoEndpoints.GETBYID(id),
		});
	}
}

export default TodosService;
