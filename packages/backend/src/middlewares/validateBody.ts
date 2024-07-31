import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { ObjectSchema, ValidationError } from 'joi';

export const validateBody =
	(schema: ObjectSchema) =>
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			await schema.validateAsync(req.body, {
				abortEarly: false,
			});
			next();
		} catch (err) {
			if (err instanceof ValidationError) {
				const error = createHttpError(400, 'Bad Request', {
					errors: err.details,
				});
				next(error);
			} else {
				next(err);
			}
		}
	};
