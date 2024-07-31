import TodoService from '@/services/todo.service';
import { Request, Response } from 'express';

export class TodoController {
	constructor(private todoService: TodoService) {}

	async getAllTodo(_: Request, res: Response): Promise<void> {
		const todos = await this.todoService.findAll();
		res.send(todos);
	}
	async getTodoById(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const todo = await this.todoService.getTodoById(+id);

		res.send(todo);
	}

	async create(req: Request, res: Response): Promise<void> {
		const todo = await this.todoService.createTodo(req.body);
		res.send(todo);
	}
	async delete(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const todo = await this.todoService.deleteTodo(+id);
		res.send(todo);
	}
	async update(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const todo = await this.todoService.updateTodo(+id, req.body);
		res.send(todo);
	}
}

const todoController = new TodoController(new TodoService());
export default todoController;
