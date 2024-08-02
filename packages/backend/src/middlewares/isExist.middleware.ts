import { Request, Response, NextFunction } from 'express';
import { ApiErrors } from '@/utils';
import { ModelType, Todo } from '@/types/todos.type';
import TodoService from '@/services/todo.service';

const { findTodoByTitle } = new TodoService();

export const isExistMiddleware = (model: ModelType) => {
	return async (
		req: Request,
		_res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const reqId = req.params.id || req.body.id;

			if (!reqId) {
				return next(ApiErrors.BadRequest('ID is required'));
			}

			const record = await model.findUnique({ where: { id: reqId } });

			if (!record) {
				return next(
					ApiErrors.NotFound('Record with the given id not found'),
				);
			}

			if (req.method === 'PUT') {
				const isTodoExist: Todo | null = await findTodoByTitle(
					req.body.title,
				);

				// Determine if the existing record is different from the one being updated
				const isDifferentTodo =
					!!isTodoExist && isTodoExist.id !== reqId;

				if (isDifferentTodo) {
					return next(
						ApiErrors.Conflict(
							`Todo whit title: "${isTodoExist.title}" already exists`,
						),
					);
				}
			}

			next();
		} catch (err) {
			next(err);
		}
	};
};
