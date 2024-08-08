import { Response, Request } from 'express';
import { TodoService } from '../services/todo.service';
import { User } from '@prisma/client';
import { TodoStatus } from '@/types/todo-status.type';

const todoService = new TodoService();

export class TodoController {
	async getFilteredTodos(req: Request, res: Response): Promise<void> {
		const userId = (req.user as { id: number }).id;
		const { search, status, public: isPublic } = req.query;

		const filters = {
			search: search as string | undefined,
			status: status as TodoStatus | undefined,
			public: isPublic ? /true/.test(isPublic as string) : undefined,
			userId,
		};

		const todos = await todoService.getFilteredTodos(filters);
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
