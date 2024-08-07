import { HttpStatus } from '@/constants/http-errors.constant';
import { HttpError } from '@/helpers/http-error';
import { HandlerType } from '@/types/http-errors.type';
import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';
export function validateBody(schema: Schema): HandlerType {
	const func = async (
		req: Request,
		_: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			await schema.validateAsync(req.body);
			next();
		} catch (error) {
			next(HttpError(HttpStatus.BadRequest, (error as Error).message));
		}
	};
	return func;
}
