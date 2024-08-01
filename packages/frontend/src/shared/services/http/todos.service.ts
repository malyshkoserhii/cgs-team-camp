import { AxiosResponse } from 'axios';
import { ApiPath, TodosApiPath } from '~shared/const/apiPath.const';
import { TodoStatusE } from '~shared/enums/TodoStatus.enum';
import { TodoI } from '~shared/interfaces/todo.interface';
import { TodoFormModel } from '~shared/models/todo.model';
import HttpService from './http.service';

class TodoService extends HttpService {
	constructor() {
		super();
	}

	async findAll(): Promise<AxiosResponse<TodoI[]>> {
		return await this.get({
			config: {
				url: `${ApiPath.TODOS}/${TodosApiPath.ALL}`,
			},
			withAuth: false,
		});
	}

	async findById(id: number): Promise<AxiosResponse<TodoI>> {
		return await this.get({
			config: {
				url: `${ApiPath.TODOS}/${id}`,
			},
			withAuth: false,
		});
	}

	async deleteById(id: number): Promise<AxiosResponse<void>> {
		return await this.delete({
			config: {
				url: `${ApiPath.TODOS}/${id}`,
			},
			withAuth: false,
		});
	}

	async create(data?: TodoFormModel): Promise<AxiosResponse<TodoFormModel>> {
		return await this.post({
			config: {
				url: ApiPath.TODOS,
				data: data,
			},
			withAuth: false,
		});
	}

	async updateById(
		id: string,
		todo: TodoFormModel,
	): Promise<AxiosResponse<TodoFormModel>> {
		return await this.put({
			config: {
				url: `${ApiPath.TODOS}/${id}`,
				data: todo,
			},
			withAuth: false,
		});
	}

	async changeStatusById(
		id: number,
		status: TodoStatusE,
	): Promise<AxiosResponse<TodoI>> {
		return await this.patch({
			config: {
				url: `${ApiPath.TODOS}/${id}`,
				data: status,
			},
			withAuth: false,
		});
	}
}

const todoService = new TodoService();
export default todoService;
