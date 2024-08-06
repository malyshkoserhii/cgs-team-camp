import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from './customErrors';

const prisma = new PrismaClient();

type PrismaModelDelegate = {
	[K in keyof PrismaClient]: PrismaClient[K] extends {
		findUnique: (args: { where: { id: number } }) => Promise<unknown>;
	}
		? PrismaClient[K]
		: never;
};

const isExist = <T extends keyof PrismaClient>(
	model: T,
): ((req: Request, res: Response, next: NextFunction) => Promise<void>) => {
	return async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		const { id } = req.params;
		console.log(`Checking existence for ID: ${id}`);

		if (id) {
			const numericId = parseInt(id, 10);

			if (isNaN(numericId)) {
				return next(new AppError('Invalid ID format', 400));
			}

			try {
				const delegateModel = prisma[model] as PrismaModelDelegate[T];

				const foundItem = await delegateModel.findUnique({
					where: { id: numericId },
				});

				if (!foundItem) {
					return next(new AppError('Item not found', 404));
				}

				next();
			} catch (error) {
				next(new AppError('Internal server error', 500));
			}
		} else {
			next();
		}
	};
};

export default isExist;
