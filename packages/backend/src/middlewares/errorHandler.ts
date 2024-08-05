import { NextFunction, Request, Response } from 'express';
import { responseCodes } from '@/const/responseCodes';
import { responseMessages } from '@/const/responseMessages';

class CustomError extends Error {
	public statusCode: number;

	constructor(statusCode: number, message: string) {
		super(message);
		this.statusCode = statusCode;
	}
}

const errorHandler = (
	error: CustomError,
	_req: Request,
	res: Response,
	_next: NextFunction,
): void => {
	const statusCode = error.statusCode || responseCodes.INTERNAL_SERVER_ERROR;
	const message = error.message || responseMessages.INTERNAL_SERVER_ERROR;

	res.status(statusCode).json({
		message,
	});
};

export { CustomError, errorHandler };
