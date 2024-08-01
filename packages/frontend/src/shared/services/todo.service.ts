import { AxiosResponse } from 'axios';
import HttpServices from './http';
import {
	BaseResponse,
	ICreateTodo,
	ITodo,
} from '~shared/interfaces/todo.interface';

class TodoService extends HttpServices {
	constructor() {
		super();
	}

	async getAllTodos(): Promise<AxiosResponse<BaseResponse<ITodo[]>>> {
		// write const for endpoints strings
		return this.get({ url: 'todos/all' }, false);
	}

	async getTodoById(): Promise<AxiosResponse<BaseResponse<ITodo>>> {
		return this.get({ url: 'todos/2' }, false);
	}

	async createTodo(
		todo: ICreateTodo,
	): Promise<AxiosResponse<BaseResponse<ITodo>>> {
		return this.post({ url: 'todos/', data: todo }, false);
	}
}

export default TodoService;
