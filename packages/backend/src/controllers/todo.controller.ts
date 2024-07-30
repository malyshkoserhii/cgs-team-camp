import { Response, Request } from 'express';

import TodoService from '@/services/todo.service';

export class TodoController {
	constructor(private todoService: TodoService) {}

	async addNewTodo(req: Request, res: Response): Promise<void> {
		const newTodo = await this.todoService.createTodo(req.body);
		console.log('newTodo', newTodo);
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
export default todoController;
