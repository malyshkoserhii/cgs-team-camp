import { Response, Request } from 'express';
import TodoService from '@/services/todo.service';
import { StatusCodes } from '@/utils/const/statusCode';
import { User } from '@prisma/client';

export class TodoController {
	constructor(private todoService: TodoService) {}

	async getAllTodo(req: Request, res: Response): Promise<void> {
		const user = req.user as User;
		const todos = await this.todoService.findAll(user);
		res.status(StatusCodes.OK).json({
			code: StatusCodes.OK,
			data: todos,
		});
	}

	async getTodoById(req: Request, res: Response): Promise<void> {
		const id = req.params.id;
		const todo = await this.todoService.findOne(Number(id));

		res.status(StatusCodes.OK).json({
			code: StatusCodes.OK,
			data: todo,
		});
	}

	async createTodo(req: Request, res: Response): Promise<void> {
		const user = req.user as User;
		const newTodo = await this.todoService.createTodo(user, req.body);

		res.status(StatusCodes.Created).json({
			code: StatusCodes.Created,
			data: newTodo,
		});
	}

	async updateTodo(req: Request, res: Response): Promise<void> {
		const updatedTodo = await this.todoService.updateTodo(
			req.body,
			Number(req.params.id),
		);

		res.status(StatusCodes.OK).json({
			code: StatusCodes.OK,
			data: updatedTodo,
		});
	}

	async deleteTodo(req: Request, res: Response): Promise<void> {
		await this.todoService.deleteTodo(Number(req.params.id));

		res.status(StatusCodes.OK).json({
			code: StatusCodes.OK,
		});
	}
}

const todoController = new TodoController(new TodoService());
export default todoController;
