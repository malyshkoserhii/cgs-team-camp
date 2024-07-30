import { Response, Request } from 'express';
import TodoService from '@/services/todo.service';

export class TodoController {
	constructor(private todoService: TodoService) {}

	async getAllTodo(_: Request, res: Response): Promise<void> {
		// TODO: Write your implementation here
		const todos = await this.todoService.findAll();
		res.send(todos);
	}

	async createTodo(req: Request, res: Response): Promise<void> {
		const { title, text, userId } = req.body;

		const newTodo = await this.todoService.addTodo(title, text, userId);

		res.send({
			message: 'Successfully added',
			newTodo,
		});
	}
}

const todoController = new TodoController(new TodoService());
export default todoController;
