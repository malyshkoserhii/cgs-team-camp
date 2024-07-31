import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import TodoService from '../../services/todo.service';
import UserService from '../../services/user.service';
import { GetExistRequest, GetTodoRequest } from '../../types/requests.types';
import { ERRORS } from '../../constants';
import { IUserSession } from '@/types/user.type';

type FindServices = TodoService | UserService;

export const validateRequestBody =
	(schema: Joi.ObjectSchema) =>
	(req: Request, res: Response, next: NextFunction): Response | undefined => {
		const validationResult = schema.validate(req.body);
		if (validationResult.error) {
			return res.status(400).json({
				error: validationResult.error.details
					.map((d) => d.message)
					.join(', '),
			});
		}

		next();
	};

export const isExist =
	<T extends FindServices>(EntityClass: new () => T) =>
	async (
		req: GetExistRequest,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const entity = new EntityClass();

			if (entity instanceof TodoService) {
				const { id } = req.params;
				if (!id) throw new Error(ERRORS.ID_UNDEFINED);

				await entity.findOne(Number(id));
			}

			next();
		} catch (error: unknown) {
			if (error instanceof Error) {
				res.status(400).json({
					error:
						error.name === 'EntityNotFoundError'
							? ERRORS.NOT_FOUND
							: error.message,
				});
			}
		}
	};

export const tryCatch =
	(
		handler: (
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			req: Request<any, any, any, any>,
			res: Response,
			next: NextFunction,
		) => Promise<void>,
	) =>
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			await handler(req, res, next);
		} catch (error) {
			if (error instanceof Error)
				res.status(400).json({ error: error.message });
		}
	};
