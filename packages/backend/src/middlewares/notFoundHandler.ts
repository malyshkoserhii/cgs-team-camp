import { NextFunction, Request, Response } from 'express';

export const notFoundHandler = (
	req: Request,
	res: Response,
	_next: NextFunction,
): void => {
	res.status(404).json({
		message: 'Route not found',
	});
};
