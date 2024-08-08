import { AxiosResponse } from 'axios';
import { ApiPath, TodosApiPath } from '~shared/const/apiPath.const';
import { TodoStatusE } from '~shared/enums/TodoStatus.enum';
import { encodeSearchParams } from '~shared/helpers/searchParams';
import { TodoI } from '~shared/interfaces/todo.interface';
import { TodoFormModel } from '~shared/models/todo.model';
import { TodoFilterModel } from '~shared/models/todoFilter.model';
import { TodoStatusCounter } from '~store/todos.store';
import HttpService from './http.service';

class TodoService extends HttpService {
	constructor() {
		super();
	}

	async findAll(params?: TodoFilterModel): Promise<
		AxiosResponse<{
			todos: TodoI[];
			totalPages: number;
			hasMore: boolean;
			totalResults: number;
			statusCounter: TodoStatusCounter;
		}>
	> {
		return await this.get({
			config: {
				url: `${ApiPath.TODOS}${TodosApiPath.ALL}`,
				params: params
					? encodeSearchParams(
							params as unknown as Record<string, string>,
						)
					: {},
			},
			withAuth: true,
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

	async deleteById(id: string): Promise<AxiosResponse<void>> {
		return await this.delete({
			config: {
				url: `${ApiPath.TODOS}/${id}`,
			},
			withAuth: true,
		});
	}

	async create(data?: TodoFormModel): Promise<AxiosResponse<TodoFormModel>> {
		return await this.post({
			config: {
				url: ApiPath.TODOS,
				data: data,
			},
			withAuth: true,
		});
	}

	async updateById(
		id: string,
		todo: TodoFormModel,
	): Promise<AxiosResponse<TodoI>> {
		return await this.put({
			config: {
				url: `${ApiPath.TODOS}/${id}`,
				data: todo,
			},
			withAuth: true,
		});
	}

	async changeStatusById(
		id: string,
		status: TodoStatusE,
	): Promise<AxiosResponse<TodoI>> {
		return await this.patch({
			config: {
				url: `${ApiPath.TODOS}/${id}`,
				data: { status },
			},
			withAuth: true,
		});
	}
}

const todoService = new TodoService();
export default todoService;
