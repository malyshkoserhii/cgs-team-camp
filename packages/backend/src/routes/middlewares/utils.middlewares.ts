import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { GetExistRequest } from '../../types/requests.types';
import { ERRORS } from '../../constants';
import UserService from '@/services/user.service';
import Service from '@/services/index.service';

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
	<T extends Service>(EntityClass: new () => T) =>
	async (
		req: GetExistRequest,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const entity = new EntityClass();

			if (entity instanceof UserService) {
				// const { email } = req.body;
				// try {
				// 	await entity.findOne(email);
				// 	if (req.route.path !== '/register') {
				// 		return next();
				// 	}
				// } catch (error) {
				// 	if (req.route.path === '/register') {
				// 		return next();
				// 	}
				// 	throw new Error(ERRORS.USER.NOT_EXIST);
				// }
				// throw new Error(ERRORS.USER.NOT_EXIST);
			} else {
				const { id } = req.params;
				if (Number.isNaN(Number(id)))
					throw new Error(ERRORS.ID_UNDEFINED);

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
	<P = unknown, ResBody = unknown, ReqBody = unknown, ReqQuery = unknown>(
		handler: (
			req: Request<P, ResBody, ReqBody, ReqQuery>,
			res: Response,
			next: NextFunction,
		) => Promise<void>,
	) =>
	async (
		req: Request<P, ResBody, ReqBody, ReqQuery>,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			await handler(req, res, next);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ error: error.message });
			} else {
				next(error);
			}
		}
	};
