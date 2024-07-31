import { Response, Request, NextFunction } from 'express';

import TodoService from '@/services/todo.service';
import { responseMessages } from '@/const/responseMessages';
import { responseCodes } from '@/const/responseCodes';

export class TodoController {
	constructor(private todoService: TodoService) {}

	async createTodo(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const todo = await this.todoService.create(req.body);

			res.status(responseCodes.CREATED).json(todo);
		} catch (e) {
			next(e);
		}
	}

	async updateTodo(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { id } = req.params;
			const updatedTodo = await this.todoService.update(id, req.body);

			res.status(responseCodes.OK).json(updatedTodo);
		} catch (e) {
			next(e);
		}
	}

	async getAllTodo(
		_: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const todos = await this.todoService.findAll();

			res.json(todos);
		} catch (e) {
			next(e);
		}
	}

	async getTodoById(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { id } = req.params;
			const todo = await this.todoService.findById(id);

			res.json(todo);
		} catch (e) {
			next(e);
		}
	}

	async deleteTodo(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { id } = req.params;
			await this.todoService.delete(id);

			res.status(responseCodes.NO_CONTENT).json({
				message: responseMessages.DELETED,
			});
		} catch (e) {
			next(e);
		}
	}
}

const todoController = new TodoController(new TodoService());
export default todoController;
