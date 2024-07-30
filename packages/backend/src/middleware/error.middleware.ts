import { NextFunction, Response } from 'express';

import { ErrorCodes } from '@/utils/const/errors';
import { ApiError } from '@/utils/helpers/ApiError.helper';
import { Error } from '@/types/shared.type';

const errorMiddleware = (
	err: Error,
	_: unknown,
	res: Response,
	next: NextFunction,
): Response<unknown, Record<string, unknown>> => {
	if (err.code === ErrorCodes.internalServerError) {
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

export { errorMiddleware };
