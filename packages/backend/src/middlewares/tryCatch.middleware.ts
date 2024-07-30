import { Response, NextFunction } from 'express';

export const tryCatchMiddleware =
	<T>(fn: (req: T, res: Response, next: NextFunction) => Promise<void>) =>
	async (req: T, res: Response, next: NextFunction): Promise<void> => {
		try {
			await fn(req, res, next);
		} catch (err) {
			next(err);
		}
	};
