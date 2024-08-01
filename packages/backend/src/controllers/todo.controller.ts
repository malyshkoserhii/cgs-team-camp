import { Response, Request } from 'express';
import { TodoService } from '../services/todo.service';

const todoService = new TodoService();

export class TodoController {
	async getAllTodos(req: Request, res: Response): Promise<void> {
		const todos = await todoService.getAllTodos();
		res.json(todos);
	}

	async getTodoById(req: Request, res: Response): Promise<void> {
		const id = parseInt(req.params.id);
		const todo = await todoService.getTodoById(id);
		res.json(todo);
	}

	async createTodo(req: Request, res: Response): Promise<void> {
		const todo = await todoService.createTodo(req.body);
		res.status(201).json(todo);
	}

	async updateTodo(req: Request, res: Response): Promise<void> {
		const id = parseInt(req.params.id);
		const todo = await todoService.updateTodo(id, req.body);
		res.json(todo);
	}

	async deleteTodo(req: Request, res: Response): Promise<void> {
		const id = parseInt(req.params.id);
		await todoService.deleteTodo(id);
		res.status(204).send();
	}
}
