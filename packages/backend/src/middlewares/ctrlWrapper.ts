import { NextFunction, Request, RequestHandler, Response } from 'express';

export const ctrlWrapper = (controller: RequestHandler): RequestHandler => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await controller(req, res, next);
		} catch (err) {
			next(err);
		}
	};
};
