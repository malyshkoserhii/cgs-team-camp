import { Response, Request } from 'express';
import { TodoService } from '../services/todo.service';
import { User } from '@prisma/client';

const todoService = new TodoService();

export class TodoController {
	getAllTodos = async (req: Request, res: Response): Promise<void> => {
		const userId = (req.user as User).id;
		const todos = await todoService.getAllTodos(userId);
		res.json(todos);
	};

	async getMyTodos(req: Request, res: Response): Promise<void> {
		const userId = (req.user as User).id;
		const todos = await todoService.getTodosByUserId(userId);
		res.json(todos);
	}

	async getTodoById(req: Request, res: Response): Promise<void> {
		const id = parseInt(req.params.id);
		const userId = (req.user as User).id;
		const todo = await todoService.getTodoById(id, userId);
		if (!todo) {
			res.status(404).json({
				message: 'Todo not found or access denied',
			});
			return;
		}
		res.json(todo);
	}

	async createTodo(req: Request, res: Response): Promise<void> {
		const userId = (req.user as User).id;
		const todo = await todoService.createTodo({ ...req.body, userId });
		res.status(201).json(todo);
	}

	async updateTodo(req: Request, res: Response): Promise<void> {
		const id = parseInt(req.params.id);
		const userId = (req.user as User).id;
		const todo = await todoService.updateTodo(id, userId, req.body);
		if (!todo) {
			res.status(404).json({
				message: 'Todo not found or access denied',
			});
			return;
		}
		res.json(todo);
	}

	async deleteTodo(req: Request, res: Response): Promise<void> {
		const id = parseInt(req.params.id);
		const userId = (req.user as User).id;
		const success = await todoService.deleteTodo(id, userId);
		if (!success) {
			res.status(404).json({
				message: 'Todo not found or access denied',
			});
			return;
		}
		res.status(204).send();
	}
}
