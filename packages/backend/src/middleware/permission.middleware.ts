import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from '@/utils/const/statusCodes';
import { ApiError } from '@/utils/helpers/ApiError.helper';

export const checkPermission = () => {
	return async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response<unknown, Record<string, unknown>> | undefined> => {
		try {
			if (req.entity.userId !== req.user.id) {
				throw ApiError.ForbiddenError();
			}

			next();
		} catch (error) {
			if (error instanceof ApiError) {
				return res.status(StatusCodes.badRequest).json({
					error: error.message,
					status: error.status,
				});
			}
		}
	};
};
