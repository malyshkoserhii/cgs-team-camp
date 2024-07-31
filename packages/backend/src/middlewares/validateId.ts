import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { validate as uuidValidate } from 'uuid';

export const isValidId = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	const { id } = req.params;

	if (!uuidValidate(id)) {
		return next(createError(404, 'Not found'));
	}

	next();
};
