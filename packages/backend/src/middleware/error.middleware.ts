import { NextFunction, Response } from 'express';
import { ApiError } from '@/utils/helpers/ApiError.helper';
import { Error } from '@/utils/types/shared.type';
import { StatusCodes } from '@/utils/const/statusCodes';

export const errorMiddleware = (
	err: Error,
	_: unknown,
	res: Response,
	next: NextFunction,
): Response<unknown, Record<string, unknown>> => {
	if (err.code === StatusCodes.internalServerError) {
		next();
	}
	if (err instanceof ApiError) {
		return res
			.status(err.status)
			.json({ error: err.message, status: err.status });
	} else {
		return res.json({ error: err.message });
	}
};
