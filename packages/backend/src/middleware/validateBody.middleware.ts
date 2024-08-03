import { NextFunction, Request, Response } from 'express';
import Joi, { ObjectSchema } from 'joi';
import { ErrorMessages } from '@/utils/const/errors';
import { StatusCodes } from '@/utils/const/statusCodes';
import { ValuesOf } from '@/utils/types/shared.type';

type JoiSchema<T> = ObjectSchema<T>;

export const validateBodyMiddleware =
	<T extends Record<string, ValuesOf<T>>>(schema: JoiSchema<T>) =>
	async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response<unknown, Record<string, unknown>> | void> => {
		const body = req.body;
		try {
			await schema.validateAsync(body, { abortEarly: false });
			next();
		} catch (error) {
			if (error instanceof Joi.ValidationError) {
				const errorMessage = error.details
					.map((detail) => detail.message)
					.join(', ');

				return res.status(StatusCodes.badRequest).json({
					error: errorMessage,
					status: ErrorMessages.badRequest,
				});
			} else {
				return next(error);
			}
		}
	};
