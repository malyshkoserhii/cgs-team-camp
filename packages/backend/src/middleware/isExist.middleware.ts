import { NextFunction, Request, Response } from 'express';
import { ErrorMessages } from '@/utils/const/errors';
import { StatusCodes } from '@/utils/const/statusCodes';
import { ApiError } from '@/utils/helpers/ApiError.helper';
import {
	entityIsExist,
	PrismaModelDelegate,
} from '@/utils/helpers/isExist.helper';

export const isExists = (model: keyof PrismaModelDelegate) => {
	return async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void | Response<unknown, Record<string, unknown>>> => {
		const id = Number(req.params.id);

		if (isNaN(id)) {
			return res
				.status(StatusCodes.badRequest)
				.json({ error: ErrorMessages.invalidId(String(id)) });
		}

		try {
			const entity = await entityIsExist(id, model);
			req.entity = entity;
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
