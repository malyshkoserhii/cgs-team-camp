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
				return next(HttpError(404, 'wrong type of id'));
			}

			await model.findUniqueOrThrow({
				where: { id: +req.params.id },
			});
			next();
		} catch (error) {
			next(HttpError(404, 'no such id in this model'));
		}
	};
}
