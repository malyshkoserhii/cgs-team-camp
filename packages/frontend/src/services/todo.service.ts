import axios, { AxiosResponse } from 'axios';
import { ApiTodoEndpoints } from '~shared/keys/api-keys';
import {
	Todo,
	CreateTodoType,
	UpdateTodoType,
	GetAllTodoType,
} from '~/utils/types';

class TodosService {
	private apiUrl = process.env.REACT_APP_API_BASE_URL as string;

	public async fetchAllTodos(): Promise<AxiosResponse<GetAllTodoType>> {
		return axios.get<GetAllTodoType>(
			`${this.apiUrl}/${ApiTodoEndpoints.ALL}`,
		);
	}

	public async createTodo(
		newTodo: CreateTodoType,
	): Promise<AxiosResponse<Todo>> {
		return axios.post<Todo>(
			`${this.apiUrl}/${ApiTodoEndpoints.CREATE}`,
			newTodo,
		);
	}

	public async getTodoById(id: number): Promise<AxiosResponse<Todo>> {
		return axios.get<Todo>(
			`${this.apiUrl}/${ApiTodoEndpoints.GETBYID(id)}`,
		);
	}

	public async updateTodo(
		id: number,
		updatedTodo: UpdateTodoType,
	): Promise<AxiosResponse<Todo>> {
		return axios.put<Todo>(
			`${this.apiUrl}/${ApiTodoEndpoints.GETBYID(id)}`,
			updatedTodo,
		);
	}

	public async removeTodo(id: number): Promise<AxiosResponse<void>> {
		return axios.delete<void>(
			`${this.apiUrl}/${ApiTodoEndpoints.GETBYID(id)}`,
		);
	}
}

export default TodosService;
