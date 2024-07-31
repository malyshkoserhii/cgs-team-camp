import { Request, Response, NextFunction } from 'express';
import { ApiErrors } from '@/utils';

// TODO After morning meet QA -> have to use Joi Schema to validate req.body
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
