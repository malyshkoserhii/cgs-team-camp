import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

import { CustomError } from '@/types';
import { ApiErrors, PrismaErrors } from '@/utils';

export const globalErrorHandler = (
	err: unknown,
	_req: Request,
	res: Response,
	_next: NextFunction,
): unknown => {
	// catch prismaClient errors
	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		const prismaError: ApiErrors = PrismaErrors.handlePrismaError(err);
		return res
			.status(prismaError.status)
			.json({ message: prismaError.message });
	}

	// catch http errors
	if (err instanceof Error) {
		const status = (err as CustomError).status || 500;
		const message = err.message || 'Internal server error';

		return res.status(status).json({ message });
	}
};
