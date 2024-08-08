import { Response, Request, NextFunction } from 'express';

import { User } from '@prisma/client';
import { Todo, TodoQueryParams } from '@/types';
import { tryCatchMiddleware } from '@/middlewares';
import TodoService from '@/services/todo.service';
import { ApiErrors } from '@/utils';

export class TodoController {
	constructor(private todoService: TodoService) {}

	async addNewTodo(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const isTodoExist: Todo | null = await this.todoService.findTodoByTitle(
			req.body.title,
		);
		// Check if a record with the given title already exists
		if (isTodoExist)
			return next(
				ApiErrors.Conflict(
					`Todo with title: "${isTodoExist.title}" already exists`,
				),
			);

		// create new record
		const newTodo = await this.todoService.createTodo(req.body);
		res.status(201).json(newTodo);
	}

	async getAllTodos(req: Request, res: Response): Promise<void> {
		const user = req.user as User;
		console.log('req.query: ', req.query);
		const query = {
			search: req.query.search as string,
			isPrivate: req.query.isPrivate
				? req.query.isPrivate === 'true'
				: undefined,
			isCompleted: req.query.isCompleted
				? req.query.isCompleted === 'true'
				: undefined,
		} as unknown as TodoQueryParams;

		console.log('query: ', query);
		const filteredTodos = await this.todoService.findAll(user, query);
		console.log('filteredTodos1: ', filteredTodos);
		res.status(200).json(filteredTodos);
	}

	async getAllTodo(_: Request, res: Response): Promise<void> {
		const todos = await this.todoService.findTodos();
		res.status(200).json(todos);
	}

	async getTodoById(req: Request, res: Response): Promise<void> {
		const reqId = req.params.id || req.body.id;
		const todo = await this.todoService.findTodoById(reqId);
		res.status(200).json(todo);
	}

	async updateTodoById(req: Request, res: Response): Promise<void> {
		const reqId = req.params.id || req.body.id;
		const todo = await this.todoService.updateTodo(reqId, req.body);
		res.status(200).json(todo);
	}

	async deleteTodoById(req: Request, res: Response): Promise<void> {
		const reqId = req.params.id || req.body.id;
		await this.todoService.deleteTodo(reqId);
		res.status(204).end();
	}

	async patchTodoById(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const reqId = req.params.id;
		const updatedFields = req.body;

		if (Object.keys(updatedFields).length === 0) {
			return next(ApiErrors.BadRequest('No fields provided for update'));
		}

		const updatedTodo = await this.todoService.updateTodoField(
			reqId,
			updatedFields,
		);

		res.status(200).json(updatedTodo);
	}
}

const todoController = new TodoController(new TodoService());

export const ctrAddNewTodo = tryCatchMiddleware(
	todoController.addNewTodo.bind(todoController),
);
export const ctrGetAllTodo = tryCatchMiddleware(
	todoController.getAllTodo.bind(todoController),
);
export const ctrGetTodoById = tryCatchMiddleware(
	todoController.getTodoById.bind(todoController),
);
export const ctrUpdateTodoById = tryCatchMiddleware(
	todoController.updateTodoById.bind(todoController),
);
export const ctrDeleteTodoById = tryCatchMiddleware(
	todoController.deleteTodoById.bind(todoController),
);
export const ctrPatchTodoById = tryCatchMiddleware(
	todoController.patchTodoById.bind(todoController),
);
export const ctrGetAllWithFilter = tryCatchMiddleware(
	todoController.getAllTodos.bind(todoController),
);
