import { BACKEND_KEYS } from '~shared/keys';
import HttpService from '../../../api/http.service';
import TodoModel, { createTodoModel } from '../../types/todo/todo.model';
import { ITodo, ITodoCreate, TodoFilters } from '../../types/todo/todo.types';

class TodoService extends HttpService {
	async getTodos(
		filter: TodoFilters,
	): Promise<{ todos: TodoModel[]; pages: number }> {
		console.log(filter);

		const { data, pages = 1 } = await this.get<ITodo[]>({
			url: BACKEND_KEYS.TODOS.ROOT,
			params: { ...filter },
		});

		return { todos: data.map((todo) => createTodoModel(todo)), pages };
	}

	async createTodo(body: ITodoCreate): Promise<ITodo> {
		const { data } = await this.put<ITodo>({
			method: 'post',
			url: BACKEND_KEYS.TODOS.CREATE,
			data: body,
		});

		return data;
	}

	async updateTodo({ id, ...body }: ITodo): Promise<ITodo> {
		const { data } = await this.put<ITodo>({
			method: 'put',
			url: BACKEND_KEYS.TODOS.UPDATE(id),
			data: body,
		});

		return data;
	}

	async deleteTodo(id: number): Promise<ITodo> {
		const { data } = await this.delete<ITodo>({
			method: 'delete',
			url: BACKEND_KEYS.TODOS.DELETE(id),
		});

		return data;
	}
}

export default new TodoService();
