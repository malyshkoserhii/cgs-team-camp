import { ValidationChain, validationResult } from 'express-validator';
import { NextFunction, RequestHandler, Request, Response } from 'express';

export const validate = (schema: ValidationChain[]): RequestHandler => {
	return async (req: Request, res: Response, next: NextFunction) => {
		// Run all validation chains
		await Promise.all(schema.map((validation) => validation.run(req)));

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	};
};
