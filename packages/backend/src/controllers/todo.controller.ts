import { Response, Request, NextFunction } from 'express';

import TodoService from '@/services/todo.service';
import { tryCatchMiddleware } from '@/middlewares';
import { ApiErrors } from '@/utils';
import { Todo } from '@/types';

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
					`Todo whit title: "${isTodoExist.title}" already exists`,
				),
			);

		// create new record
		const newTodo = await this.todoService.createTodo(req.body);
		res.status(201).json(newTodo);
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
