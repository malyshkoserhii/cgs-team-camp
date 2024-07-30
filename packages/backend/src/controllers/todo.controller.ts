import { Response, Request } from 'express';
import TodoService from '@/services/todo.service';
import TryCatch from '@/utils/decorators/TryCatch';
import { StatusCodes } from '@/utils/const/statusCodes';
import { Status } from '@/utils/const/status';
import { RequestWithUser } from '@/utils/interfaces/user.interface';

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
		const data = await this.todoService.findById(Number(req.params.id));

		res.status(StatusCodes.ok).json({
			code: StatusCodes.ok,
			status: Status.success,
			data,
		});
	}

	async deleteById(req: Request, res: Response): Promise<void> {
		await this.todoService.deleteById(Number(req.params.id));

		res.status(StatusCodes.ok).json({
			code: StatusCodes.noContent,
			status: Status.success,
		});
	}

	async create(req: RequestWithUser, res: Response): Promise<void> {
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
