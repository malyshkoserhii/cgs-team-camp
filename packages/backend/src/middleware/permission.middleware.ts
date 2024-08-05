import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from '@/utils/const/statusCodes';
import { ApiError } from '@/utils/helpers/ApiError.helper';

export const checkPermission = () => {
	return async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			if (req.entity.userId !== req.user.id) {
				throw ApiError.ForbiddenError();
			}

			next();
		} catch (error) {
			if (error instanceof ApiError) {
				res.status(StatusCodes.badRequest).json({
					error: error.message,
					status: error.status,
				});
			}
		}
	};
};
