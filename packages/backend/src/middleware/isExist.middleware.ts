import { Request, Response, NextFunction, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';
import { PrismaModelDelegate } from '../types/prisma.type';

const prisma = new PrismaClient();

export const isExist = <T extends keyof PrismaModelDelegate>(
	model: T,
): RequestHandler => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const id = parseInt(req.params.id);
		const modelDelegate = prisma[model] as PrismaModelDelegate[T];
		const item = await modelDelegate.findUnique({ where: { id } });
		if (!item) {
			return res.status(404).json({ error: 'Item does not exist' });
		}
		next();
	};
};
