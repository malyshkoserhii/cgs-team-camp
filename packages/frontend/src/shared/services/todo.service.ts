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
		return this.get({ url: 'all' }, false);
	}

	async getTodoById(id: string): Promise<AxiosResponse<BaseResponse<ITodo>>> {
		return this.get({ url: id }, false);
	}

	async createTodo(
		todo: ICreateTodo,
	): Promise<AxiosResponse<BaseResponse<ITodo>>> {
		return this.post({ url: '', data: todo }, false);
	}

	async updateTodo(
		id: string,
		data: Partial<ICreateTodo>,
	): Promise<AxiosResponse<BaseResponse<ITodo>>> {
		return this.putch({ url: id, data }, false);
	}

	async deleteTodo(id: string): Promise<AxiosResponse<BaseResponse<ITodo>>> {
		return this.delete({ url: id }, false);
	}
}

export default TodoService;
