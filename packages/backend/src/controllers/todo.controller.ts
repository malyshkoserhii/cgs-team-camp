import TodoService from '@/services/todo.service';
import { responseMessages } from '@/const/responseMessages';
import { responseCodes } from '@/const/responseCodes';

import type { Response, NextFunction } from 'express';

import { TodoStatus } from '@prisma/client';
import type { RequestWithUser } from '@/types/request.type';

export class TodoController {
	constructor(private todoService: TodoService) {}

	async createTodo(
		req: RequestWithUser,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const userId = req.user!.id;
			const todo = await this.todoService.create(req.body, userId);
			res.status(responseCodes.CREATED).json(todo);
		} catch (e) {
			next(e);
		}
	}

	async updateTodo(
		req: RequestWithUser,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { id } = req.params;
			const userId = req.user!.id;

			const updatedTodo = await this.todoService.update(
				id,
				req.body,
				userId,
			);

			if (!updatedTodo) {
				res.status(responseCodes.FORBIDDEN).json({
					message: responseMessages.FORBIDDEN,
				});
				return;
			}

			res.status(responseCodes.OK).json(updatedTodo);
		} catch (e) {
			next(e);
		}
	}

	async getAllTodo(
		req: RequestWithUser,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const userId = req.user!.id;
			const {
				search,
				isPrivate,
				status,
				page = '1',
				pageSize = '10',
			} = req.query;

			const filters = {
				search: search as string | undefined,
				isPrivate:
					isPrivate === 'true'
						? true
						: isPrivate === 'false'
							? false
							: undefined,
				status: status as TodoStatus | undefined,
			};

			const result = await this.todoService.findAll(
				userId,
				filters,
				parseInt(page as string, 10),
				parseInt(pageSize as string, 10),
			);

			res.json({
				todos: result.todos,
				totalCount: result.totalCount,
				currentPage: parseInt(page as string, 10),
				pageSize: parseInt(pageSize as string, 10),
			});
		} catch (e) {
			next(e);
		}
	}

	async getTodoById(
		req: RequestWithUser,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { id } = req.params;
			const userId = req.user!.id;
			const todo = await this.todoService.findById(id, userId);

			if (!todo) {
				res.status(responseCodes.NOT_FOUND).json({
					message: responseMessages.NOT_FOUND,
				});
				return;
			}

			res.json(todo);
		} catch (e) {
			next(e);
		}
	}

	async deleteTodo(
		req: RequestWithUser,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { id } = req.params;
			const userId = req.user!.id;
			const deletedTodo = await this.todoService.delete(id, userId);

			if (!deletedTodo) {
				res.status(responseCodes.FORBIDDEN).json({
					message: responseMessages.FORBIDDEN,
				});
				return;
			}

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
