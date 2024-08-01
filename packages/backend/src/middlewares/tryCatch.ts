import { Request, Response, NextFunction } from 'express';

const tryCatch = (
	controller: (
		req: Request,
		res: Response,
		next: NextFunction,
	) => Promise<void>,
) => {
	return async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			await controller(req, res, next);
		} catch (error) {
			next(error);
		}
	};
};

export default tryCatch;
