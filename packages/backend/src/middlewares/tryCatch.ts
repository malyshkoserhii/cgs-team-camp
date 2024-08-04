import { Request, Response, NextFunction } from 'express';
import { User } from '@prisma/client';

type RequestWithUser = Request & { user?: User };

const tryCatch = (
	fn: (
		req: RequestWithUser,
		res: Response,
		next: NextFunction,
	) => Promise<void>,
): ((req: Request, res: Response, next: NextFunction) => Promise<void>) => {
	return (req: Request, res: Response, next: NextFunction): Promise<void> => {
		return Promise.resolve(fn(req as RequestWithUser, res, next)).catch(
			next,
		);
	};
};

export default tryCatch;
