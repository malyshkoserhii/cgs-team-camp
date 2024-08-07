import { Response, Request, NextFunction } from 'express';
import TodoService from '@/services/todo.service';
import { Todo, User } from '@prisma/client';

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

	async getTodosByUserId(req: Request, res: Response): Promise<void> {
		const userId = (req.user as User).id;
		const todos = await this.todoService.findByUserId(userId);
		res.json(todos);
	}

	async getPublicTodos(req: Request, res: Response): Promise<void> {
		const todos = await this.todoService.getPublicTodos();
		res.json(todos);
	}

	async getTodoById(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const id = parseInt(req.params.id, 10);
			const userId = (req.user as User).id;
			const todo = await this.todoService.findById(id, userId);
			if (todo) {
				res.json(todo);
			} else {
				res.status(404).json({ message: 'Todo not found' });
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
			const userId = (req.user as User).id;
			const todo = await this.todoService.create({
				...req.body,
				userId,
			});
			res.status(201).json(todo);
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
			const userId = (req.user as User).id;
			const todoData: Partial<
				Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>
			> = req.body;
			const todo = await this.todoService.update(
				parseInt(req.params.id, 10),
				todoData,
				userId,
			);

			if (todo) {
				res.json(todo);
			} else {
				res.status(404).json({
					message: 'Todo not found or unauthorized',
				});
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
			const userId = (req.user as User).id;
			await this.todoService.delete(parseInt(req.params.id, 10), userId);
			res.send({ message: 'Todo deleted successfully' });
		} catch (error) {
			next(error);
		}
	}
}

const todoController = new TodoController(new TodoService());
export default todoController;
