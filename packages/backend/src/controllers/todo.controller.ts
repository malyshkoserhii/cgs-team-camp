import { Response, Request } from 'express';
import TodoService from '@/services/todo.service';

export class TodoController {
	constructor(private todoService: TodoService) {}

	async getAllTodo(req: Request, res: Response): Promise<void> {
		let todos = await this.todoService.findAll();

		res.send({
			message: 'OK',
			todos,
		});
	}

	async createTodo(req: Request, res: Response): Promise<void> {
		const {
			title,
			text,
			isCompleted = false,
			isPrivate = false,
		} = req.body;

		const newTodo = await this.todoService.addTodo(
			title,
			text,
			isCompleted,
			isPrivate,
		);

		res.send({
			message: 'Successfully added',
			newTodo,
		});
	}
}

const todoController = new TodoController(new TodoService());
export default todoController;
