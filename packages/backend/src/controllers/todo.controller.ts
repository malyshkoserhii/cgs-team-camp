import { Response, Request, NextFunction } from 'express';
import TodoService from '@/services/todo.service';

export class TodoController {
	constructor(private todoService: TodoService) {}

	async getAllTodo(
		_: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const todos = await this.todoService.findAll();
			res.send(todos);
		} catch (error) {
			next(error);
		}
	}

	async getTodoById(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const todo = await this.todoService.findById(
				parseInt(req.params.id, 10),
			);
			if (todo) {
				res.send(todo);
			} else {
				res.status(404).send({ message: 'Todo not found' });
			}
		} catch (error) {
			next(error);
		}
	}

	async createTodo(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const todo = await this.todoService.create(req.body);
			res.send(todo);
		} catch (error) {
			next(error);
		}
	}

	async updateTodo(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const todo = await this.todoService.update(
				parseInt(req.params.id, 10),
				req.body,
			);
			if (todo) {
				res.send(todo);
			} else {
				res.status(404).send({ message: 'Todo not found' });
			}
		} catch (error) {
			next(error);
		}
	}

	async deleteTodo(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const deleted = await this.todoService.delete(
				parseInt(req.params.id, 10),
			);
			if (deleted) {
				res.send({ message: 'Todo deleted successfully' });
			} else {
				res.status(404).send({ message: 'Todo not found' });
			}
		} catch (error) {
			next(error);
		}
	}
}

const todoController = new TodoController(new TodoService());
export default todoController;
