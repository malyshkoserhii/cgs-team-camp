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

	async getFilteredTodos(req: Request, res: Response): Promise<void> {
		const userId = (req.user as { id: string }).id;
		const { search, isComplete, isPrivate, page, pageSize } = req.query;
		console.log('userID: ', userId);
		console.log('req.query: ', req.query);
		const query = {
			userId,
			search: search as string | undefined,
			statusComplete: isComplete as 'completed' | 'active' | undefined,
			statusPrivate: isPrivate as 'private' | 'public' | undefined,
			page: page ? parseInt(page as string) : undefined,
			pageSize: pageSize ? parseInt(pageSize as string) : undefined,
		};

		const { todos, total } =
			await this.todoService.findFilteredTodos(query);

		res.status(200).json({
			todos,
			pagination: {
				total,
				page: query.page || 1,
				pageSize: query.pageSize || 5,
				totalPages: Math.ceil(total / (query.pageSize || 5)),
			},
		});
	}

	// async getAllTodos(req: Request, res: Response): Promise<void> {
	// 	const user = req.user as User;
	// 	const query = {
	// 		search: req.query.search as string,
	// 		isPrivate: req.query.isPrivate
	// 			? req.query.isPrivate === 'true'
	// 			: undefined,
	// 		isCompleted: req.query.isCompleted
	// 			? req.query.isCompleted === 'true'
	// 			: undefined,
	// 	} as unknown as TodoQueryParams;
	//
	// 	const filteredTodos = await this.todoService.findAll(user, query);
	// 	res.status(200).json(filteredTodos);
	// }
	//
	// async getAllTodo(_: Request, res: Response): Promise<void> {
	// 	const todos = await this.todoService.findTodos();
	// 	res.status(200).json(todos);
	// }

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
// export const ctrGetAllTodo = tryCatchMiddleware(
// 	todoController.getAllTodo.bind(todoController),
// );
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
// export const ctrGetAllWithFilter = tryCatchMiddleware(
// 	todoController.getAllTodos.bind(todoController),
// );
export const ctrGetFilteredTodos = tryCatchMiddleware(
	todoController.getFilteredTodos.bind(todoController),
);
