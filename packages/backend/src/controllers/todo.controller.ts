import { Response, Request, NextFunction } from 'express';
import TodoService from '@/services/todo.service';
import { HttpError } from '@/error/error';

export class TodoController {
	constructor(private todoService: TodoService) {}

	async Create(req: Request, res: Response, next: NextFunction) {
		try {
			const { body } = req;
			const newTodo = await this.todoService.create(body);
			return res.json(newTodo);
		} catch (error) {
			return next(HttpError(500, 'Server Error'));
		}
	}

	async GetAll(_: Request, res: Response, next: NextFunction) {
		try {
			const allTodo = await this.todoService.findAll();
			return res.json(allTodo);
		} catch (error) {
			return next(HttpError(500, 'Server Error'));
		}
	}

	async GetOne(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			console.log(id);
			const todo = await this.todoService.findOne(Number.parseInt(id));
			return res.json(todo);
		} catch (error) {
			return next(HttpError(500, 'Server Error'));
		}
	}

	async Update(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const { body } = req;
			console.log(body);
			const todo = await this.todoService.update(
				Number.parseInt(id),
				body,
			);
			return res.json(todo);
		} catch (error) {
			return next(HttpError(500, 'Server Error'));
		}
	}

	async Delete(req: Request, res: Response, next: NextFunction) {
		try {
			await this.todoService.remove(Number.parseInt(req.params.id));
			return res.send("TODO DELETE")
		} catch (error) {
			return next(HttpError(500, 'Server Error'));
		}
	}
}

const todoController = new TodoController(new TodoService());
export default todoController;
