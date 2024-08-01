import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { Response } from 'express';
import { StatusCodes } from '@/utils/const/statusCodes';
import { ApiError } from '@/utils/helpers/ApiError.helper';
import { Error } from '@/utils/types/shared.type';

export const errorMiddleware = (
	err: Error,
	_: unknown,
	res: Response,
): Response<unknown, Record<string, unknown>> => {
	if (err instanceof PrismaClientValidationError) {
		return res.status(StatusCodes.badRequest).json({
			error: `Validation error: ${err.message}`,
			status: StatusCodes.badRequest,
		});
	}
	if (err instanceof ApiError) {
		return res
			.status(err.status)
			.json({ error: err.message, status: err.status });
	} else {
		return res.json({ error: err.message });
	}
};
