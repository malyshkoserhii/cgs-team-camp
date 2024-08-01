import { PrismaModelDelegate } from '@/types/prisma.types';
import { errorMessages } from '@/utils/const/errorMessages';
import { StatusCodes } from '@/utils/const/statusCode';
import { PrismaClient } from '@prisma/client';
import { NextFunction, RequestHandler, Request, Response } from 'express';

const prisma = new PrismaClient();

export const isExist = <T extends keyof PrismaModelDelegate>(
	model: T,
): RequestHandler => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const id = Number(req.params.id);

		if (isNaN(id)) {
			return res
				.status(StatusCodes.BadRequest)
				.json({ error: errorMessages[404] });
		}

		const modelDelegate = prisma[model] as PrismaModelDelegate[T];
		const item = await modelDelegate.findUnique({ where: { id } });

		if (!item) {
			return res
				.status(StatusCodes.NotFound)
				.json({ error: errorMessages[400] });
		}

		next();
	};
};
