import { HttpStatus } from '@/constants/http-errors.constant';
import { ResponseError } from '@/types/http-errors.type';
import { NextFunction, Request, Response } from 'express';

export function generalErrorHandler(
	err: ResponseError,
	_: Request,
	res: Response,
	__: NextFunction,
): void {
	if (err.status && err.message) {
		res.status(err.status).json({
			status: err.status,
			message: err.message,
		});
	} else {
		res.status(HttpStatus.InternalServerError).json({
			status: HttpStatus.InternalServerError,
			message: 'Internal Server Error',
		});
	}
}
