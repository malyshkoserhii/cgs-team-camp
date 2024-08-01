import { Request, Response, NextFunction } from 'express';

const tryCatch = (
	fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
): ((req: Request, res: Response, next: NextFunction) => Promise<void>) => {
	return (req: Request, res: Response, next: NextFunction): Promise<void> => {
		return Promise.resolve(fn(req, res, next)).catch(next);
	};
};

export default tryCatch;
