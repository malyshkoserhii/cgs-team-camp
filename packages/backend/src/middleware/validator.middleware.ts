import { ErrorResponse } from '@/types/error.type';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ObjectSchema, ValidationError } from 'joi';

export const validateBody = (schema: ObjectSchema): RequestHandler => {
	return (
		req: Request,
		res: Response,
		next: NextFunction,
	): void | Response<ErrorResponse> => {
		const { error }: { error?: ValidationError } = schema.validate(
			req.body,
		);
		if (error) {
			return res.status(400).json({ error: error.details[0].message });
		}
		next();
	};
};

export const validateQuery = (schema: ObjectSchema): RequestHandler => {
	return (
		req: Request,
		res: Response,
		next: NextFunction,
	): void | Response<ErrorResponse> => {
		const { error }: { error?: ValidationError } = schema.validate(
			req.query,
			{ allowUnknown: true },
		);
		if (error) {
			return res.status(400).json({ error: error.details[0].message });
		}
		next();
	};
};
