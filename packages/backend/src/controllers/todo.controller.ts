import { Response, Request } from 'express';
import TodoService from '../services/todo.service';
import {
	CreateTodoRequest,
	GetTodoRequest,
	GetTodoRequestQuery,
	UpdateTodoRequest,
} from '../types/requests.types';
import { GetTodosResponse, GetTodoResponse } from '../types/responses.types';
import { IUserSession } from '../types/user.type';
import { MESSAGES } from '../constants';

export class TodoController {
	constructor(private todoService: TodoService) {}

	async getAllTodo(
		req: Request<unknown, unknown, unknown, GetTodoRequestQuery>,
		res: Response<GetTodosResponse>,
	): Promise<void> {
		const { filter, search, page = 1 } = req.query;
		const { todos, totalCount } = await this.todoService.findAll(
			filter,
			search,
			page,
		);
		res.send({
			data: todos,
			message: `Total items: ${totalCount} Page: ${page}`,
			pages: Math.ceil(totalCount / 10),
		});
	}

	async getTodo(
		req: GetTodoRequest,
		res: Response<GetTodoResponse>,
	): Promise<void> {
		const todoId = Number(req.params.id);

		const todo = await this.todoService.findOne(todoId);

		res.send({ data: todo });
	}

	async createTodo(
		req: CreateTodoRequest,
		res: Response<GetTodoResponse>,
	): Promise<void> {
		const { id } = req.user as IUserSession;
		const todoBody = req.body;
		todoBody.creatorId = id;

		const todos = await this.todoService.create(todoBody);

		res.send({ data: todos, message: MESSAGES.TODO.CREATED });
	}

	async updateTodo(
		req: UpdateTodoRequest,
		res: Response<GetTodoResponse>,
	): Promise<void> {
		const todoBody = req.body;
		const todoId = Number(req.params.id);

		const todos = await this.todoService.update(todoId, todoBody);

		res.send({ data: todos, message: MESSAGES.TODO.UPDATED });
	}

	async deleteTodo(
		req: GetTodoRequest,
		res: Response<GetTodoResponse>,
	): Promise<void> {
		const todoId = Number(req.params.id);

		const todo = await this.todoService.deleteOne(todoId);

		res.send({ data: todo, message: MESSAGES.TODO.DELETED });
	}
}

const todoController = new TodoController(new TodoService());
export default todoController;
