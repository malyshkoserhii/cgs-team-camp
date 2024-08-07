import {
	GeneralErrorMessageList,
	HttpStatus,
} from '@/constants/http-errors.constant';
import { HttpError } from '@/helpers/http-error';
import { PrismaModelWithId } from '@/types/prisma.types';
import { NextFunction, Request, Response } from 'express';

export function isExist<T>(model: PrismaModelWithId<T>) {
	return async function (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			if (Number.isNaN(+req.params.id)) {
				return next(
					HttpError(
						HttpStatus.NotFound,
						GeneralErrorMessageList.WRONG_TYPE,
					),
				);
			}

			await model.findUniqueOrThrow({
				where: { id: +req.params.id },
			});
			next();
		} catch (error) {
			next(HttpError(HttpStatus.NotFound, GeneralErrorMessageList.NO_ID));
		}
	};
}
