import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

import { responseMessages } from '@/const/responseMessages';
import { responseCodes } from '@/const/responseCodes';
import { CustomError } from '@/middlewares/errorHandler';

const prisma = new PrismaClient();

type PrismaModelDelegate = {
	[K in keyof PrismaClient]: PrismaClient[K] extends {
		findUnique: (args: { where: { id: string } }) => Promise<unknown>;
	}
		? PrismaClient[K]
		: never;
};

export const isExist = <T extends keyof PrismaClient>(
	model: T,
): ((req: Request, res: Response, next: NextFunction) => Promise<void>) => {
	return async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		const { id } = req.params;

		try {
			const delegateModel = prisma[model] as PrismaModelDelegate[T];

			const foundItem = await delegateModel.findUnique({
				where: { id },
			});

			if (!foundItem) {
				throw new CustomError(
					responseCodes.NOT_FOUND,
					responseMessages.NOT_FOUND,
				);
			}

			next();
		} catch (error) {
			next(error);
		}
	};
};
