import { Response, Request } from 'express';
import TodoService from '@/services/todo.service';

export class TodoController {
	constructor(private todoService: TodoService) {}

	async getAllTodo(_: Request, res: Response): Promise<void> {
		// TODO: Write your implementation here
		const todos = await this.todoService.findAll();
		res.send(todos);
	}
}

const todoController = new TodoController(new TodoService());
export default todoController;
