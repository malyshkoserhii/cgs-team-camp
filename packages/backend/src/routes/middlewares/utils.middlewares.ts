import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { GetTodoRequest } from '../../types/requests.types';
import { ERRORS } from '../../constants';
import Service from '@/services/index.service';
import { prismaClient } from '@/modules/prisma';
import { IUserSession } from '@/types/user.type';

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
		req.body = validationResult.value;
		next();
	};

export const isExist =
	(EntityClass: new () => Service) =>
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const entity = new EntityClass();

			const { id } = req.params;
			if (Number.isNaN(Number(id))) {
				res.status(400).json({ error: ERRORS.ID_UNDEFINED });
				return;
			}

			await entity.findOne(Number(id));

			next();
		} catch (error: unknown) {
			if (error instanceof Error) {
				res.status(400).json({
					error:
						error.name === 'EntityNotFoundError'
							? ERRORS.NOT_FOUND
							: error.message,
				});
			} else {
				res.status(500).json({ error: 'Internal Server Error' });
			}
		}
	};

export const isTodoCreator = async (
	req: GetTodoRequest,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { id: userId } = req.user as IUserSession;
		const { id: todoId } = req.params;

		const isCreator = await prismaClient.todo.findFirstOrThrow({
			where: { id: Number(todoId), user: { id: userId } },
		});

		if (!isCreator) throw Error('NOT_CREATOR');

		next();
	} catch (error) {
		if (error instanceof Error)
			res.status(400).json({ error: error.message });
	}
};

export const tryCatch =
	<
		Params = unknown,
		ResBody = unknown,
		ReqBody = unknown,
		ReqQuery = unknown,
	>(
		handler: (
			req: Request<Params, ResBody, ReqBody, ReqQuery>,
			res: Response,
			next: NextFunction,
		) => Promise<void>,
	) =>
	async (
		req: Request<Params, ResBody, ReqBody, ReqQuery>,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			await handler(req, res, next);
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				res.status(400).json({ error: error.message });
			} else {
				next(error);
			}
		}
	};
