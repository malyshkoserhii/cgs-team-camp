import { Request, Response, NextFunction } from 'express';
import { ObjectSchema, ValidationResult } from 'joi';

import { responseCodes } from '@/const/responseCodes';
import { CustomError } from './errorHandler';

const validate = (
	schema: ObjectSchema,
): ((req: Request, res: Response, next: NextFunction) => void) => {
	return (req: Request, res: Response, next: NextFunction): void => {
		const { error }: ValidationResult = schema.validate(req.body, {
			abortEarly: false,
		});
		if (error) {
			const errorMessage = error.details[0].message;
			throw new CustomError(responseCodes.BAD_REQUEST, errorMessage);
		} else {
			next();
		}
	};
};

export default validate;
