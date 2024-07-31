import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Schema, ValidationError } from 'joi';

import { ApiErrors } from '@/utils';

export const genericValidatorMiddleware = (schema: Schema): RequestHandler => {
	return (req: Request, _res: Response, next: NextFunction): void => {
		const { error }: { error?: ValidationError } = schema.validate(
			req.body,
			{
				abortEarly: false,
				convert: false,
			},
		);

		if (error) next(ApiErrors.BadRequest(error.message));

		next();
	};
};
