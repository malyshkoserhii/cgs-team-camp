import { Request, Response, NextFunction } from 'express';
import { ApiErrors } from '@/utils';

export const validateTodoReqBody = (
	req: Request,
	_res: Response,
	next: NextFunction,
): void => {
	const { title, description, isPrivate, isCompleted } = req.body;
	const isBoolean =
		typeof isPrivate === 'boolean' && typeof isCompleted === 'boolean';

	if (!title || !description || !isBoolean) {
		return next(ApiErrors.BadRequest('Validation failed'));
	}

	next();
};
