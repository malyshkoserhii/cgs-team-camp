import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';

export const errorHandler = (
	err: HttpError | Error,
	req: Request,
	res: Response,
	_next: NextFunction,
): void => {
	if (err instanceof HttpError) {
		res.status(err.status || 500).json({
			status: err.status,
			message: err.name,
			data: err,
		});
		return;
	}

	res.status(500).json({
		status: 500,
		message: 'Something went wrong',
		error: err.message,
	});
};
