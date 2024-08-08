import { Response, Request } from 'express';
import { TodoService } from '../services/todo.service';
import { User } from '@prisma/client';
import { TodoStatus } from '@/types/todo-status.type';

const todoService = new TodoService();

export class TodoController {
	async getFilteredTodos(req: Request, res: Response): Promise<void> {
		const userId = (req.user as { id: number }).id;
		const { search, status, public: isPublic, page, pageSize } = req.query;

		const filters = {
			search: search as string | undefined,
			status: status as TodoStatus | undefined,
			public: isPublic ? /true/.test(isPublic as string) : undefined,
			userId,
			page: page ? parseInt(page as string) : undefined,
			pageSize: pageSize ? parseInt(pageSize as string) : undefined,
		};

		const { todos, total } = await todoService.getFilteredTodos(filters);

		res.json({
			todos,
			pagination: {
				total,
				page: filters.page || 1,
				pageSize: filters.pageSize || 10,
				totalPages: Math.ceil(total / (filters.pageSize || 10)),
			},
		});
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
		const { title, description, completed, public: isPublic } = req.body;

		const updatedTodo = await todoService.updateTodo(id, userId, {
			title,
			description,
			completed,
			public: isPublic,
		});

		if (!updatedTodo) {
			res.status(404).json({
				message: 'Todo not found or access denied',
			});
			return;
		}

		res.json(updatedTodo);
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
