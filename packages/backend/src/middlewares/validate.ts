import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

const validate =
	(schema: ObjectSchema) =>
	(req: Request, res: Response, next: NextFunction): void => {
		const { error } = schema.validate(req.body);

		if (error) {
			res.status(400).json({ message: error.details[0].message });
		}

		next();
	};

export default validate;
