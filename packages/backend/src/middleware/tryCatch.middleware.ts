import { Request, Response, NextFunction, RequestHandler } from 'express';

export const tryCatch = (controller: RequestHandler): RequestHandler => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await controller(req, res, next);
		} catch (error) {
			next(error);
		}
	};
};
