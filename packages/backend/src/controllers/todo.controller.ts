import { Request, Response } from 'express';
import TodoService from '@/services/todo.service';
import { Status } from '@/utils/const/status';
import { StatusCodes } from '@/utils/const/statusCodes';
import TryCatch from '@/utils/decorators/TryCatch.decorator';

@TryCatch
export class TodoController {
	constructor(private todoService: TodoService) {}

	async getAllTodo(_: Request, res: Response): Promise<void> {
		const data = await this.todoService.findAll();

		res.status(StatusCodes.ok).json({
			code: StatusCodes.ok,
			status: Status.success,
			data,
		});
	}

	async findById(req: Request, res: Response): Promise<void> {
		res.status(StatusCodes.ok).json({
			code: StatusCodes.ok,
			status: Status.success,
			data: req.entity,
		});
	}

	async deleteById(req: Request, res: Response): Promise<void> {
		await this.todoService.deleteById(Number(req.params.id));

		res.status(StatusCodes.ok).json({
			code: StatusCodes.noContent,
			status: Status.success,
		});
	}

	async create(req: Request, res: Response): Promise<void> {
		const data = await this.todoService.create(req.body);

		res.status(StatusCodes.created).json({
			code: StatusCodes.created,
			status: Status.success,
			data,
		});
	}

	async updateById(req: Request, res: Response): Promise<void> {
		const data = await this.todoService.updateById(
			Number(req.params.id),
			req.body,
		);

		res.status(StatusCodes.ok).json({
			code: StatusCodes.ok,
			status: Status.success,
			data,
		});
	}

	async changeStatusById(req: Request, res: Response): Promise<void> {
		const data = await this.todoService.changeStatusById(
			Number(req.params.id),
			req.body,
		);

		res.status(StatusCodes.ok).json({
			code: StatusCodes.ok,
			status: Status.success,
			data,
		});
	}
}

const todoController = new TodoController(new TodoService());
export default todoController;
