import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from '@/types/request.type';

type AsyncRequestHandler = (
	req: RequestWithUser,
	res: Response,
	next: NextFunction,
) => Promise<void>;

const tryCatch = (fn: AsyncRequestHandler) => {
	return async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			await fn(req as RequestWithUser, res, next);
		} catch (error) {
			next(error);
		}
	};
};

export default tryCatch;
