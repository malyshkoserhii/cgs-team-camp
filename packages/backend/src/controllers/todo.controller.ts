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

	async getById(req: Request, res: Response): Promise<void> {
		const { id } = req.params;

		const todo = await this.todoService.getById(id);

		if (todo) {
			res.status(200).json({
				status: 200,
				message: `Successfully found todo with id ${id}!`,
				data: todo,
			});
		} else {
			res.status(404).json({
				status: 404,
				message: `Todo with id ${id} not found!`,
			});
		}
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

	async deleteTodo(req: Request, res: Response): Promise<void> {
		const { id } = req.params;

		const deletedTodo = await this.todoService.deleteTodo(id);

		res.send({
			message: 'OK',
			deletedTodo,
		});
	}

	async updateTodo(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const updates = req.body;

		const updatedTodo = await this.todoService.updateTodo(id, updates);

		if (updatedTodo) {
			res.status(200).json({
				status: 200,
				message: `Successfully updated todo with id ${id}!`,
				data: updatedTodo,
			});
		} else {
			res.status(404).json({
				status: 404,
				message: `Todo with id ${id} not found!`,
			});
		}
	}
}

const todoController = new TodoController(new TodoService());
export default todoController;
