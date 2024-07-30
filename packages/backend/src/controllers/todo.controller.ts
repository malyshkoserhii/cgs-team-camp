import TodoService from '@/services/todo.service';
import { Request, Response } from 'express';

export class TodoController {
	constructor(private todoService: TodoService) {}

	async getAllTodo(_: Request, res: Response): Promise<void> {
		const todos = await this.todoService.findAll();
		res.send(todos);
	}
}

const todoController = new TodoController(new TodoService());
export default todoController;
