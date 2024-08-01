import { NextFunction, Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AppError } from './customErrors';

interface CustomError extends Error {
	statusCode?: number;
}

const errorHandler = (
	error: CustomError,
	_: Request,
	res: Response,
	__: NextFunction,
): void => {
	if (error instanceof AppError) {
		res.status(error.statusCode).json({ message: error.message });
	} else if (error instanceof PrismaClientKnownRequestError) {
		res.status(400).json({ message: 'Database error' });
	} else {
		res.status(500).json({ message: 'Internal server error' });
	}
};

export { errorHandler };
