import TodoService from '@/services/todo.service';
import { GetAllTodoQuery } from '@/types/todos.type';
import { UserType } from '@/types/user.types';
import { parseBoolean } from '@/utils/parseBoolean';
import { Request, Response } from 'express';

export class TodoController {
	constructor(private todoService: TodoService) {}

	async getAllTodo(req: Request, res: Response): Promise<void> {
		const user = req.user as UserType;
		const query = {
			isPrivate: parseBoolean(req.query.isPrivate as string),
			isCompleted: parseBoolean(req.query.isCompleted as string),
			search: req.query.search as string,
			page: req.query.page,
		} as unknown as GetAllTodoQuery;
		const data = await this.todoService.findAll(user, query);
		res.send(data);
	}
	async getTodoById(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const todo = await this.todoService.getTodoById(+id);

		res.send(todo);
	}

	async create(req: Request, res: Response): Promise<void> {
		const user = req.user as UserType;
		const todo = await this.todoService.createTodo(user, req.body);
		res.send(todo);
	}
	async delete(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const todo = await this.todoService.deleteTodo(+id);
		res.send(todo);
	}
	async update(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const todo = await this.todoService.updateTodo(+id, req.body);
		res.send(todo);
	}
}

const todoController = new TodoController(new TodoService());
export default todoController;
