import { StatusCodes } from '@/utils/const/statusCode';
import { NextFunction, RequestHandler, Response, Request } from 'express';
import { ObjectSchema } from 'joi';

export const validateBody = (schema: ObjectSchema): RequestHandler => {
	return (
		req: Request,
		res: Response,
		next: NextFunction,
	): void | Response => {
		const { error } = schema.validate(req.body);

		if (error) {
			return res
				.status(StatusCodes.BadRequest)
				.json({ error: error.details[0].message });
		}

		next();
	};
};
