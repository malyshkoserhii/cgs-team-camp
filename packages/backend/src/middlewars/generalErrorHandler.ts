import { HttpStatus } from '@/constants/http-errors.constant';
import { ResponseError } from '@/types/http-errors.type';
import { Request, Response } from 'express';

export const generalErrorHandler = (
	err: ResponseError,
	req: Request,
	res: Response,
): void => {
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
};
