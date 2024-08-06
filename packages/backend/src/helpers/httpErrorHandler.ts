import { StatusCodes } from '@/utils/const/statusCode';
import { Response, Request, NextFunction } from 'express';
import { IHttpError } from './httpError';

const HttpErrorHandler = (
	err: IHttpError,
	_: Request,
	res: Response,
	next: NextFunction,
): void => {
	const { status = StatusCodes.InternalServerError, message } = err;

	res.status(status).json({ message });
	next();
};

export default HttpErrorHandler;
