import { PrismaClient } from '@prisma/client';
import { ApiError } from './ApiError.helper';
import { ErrorMessages } from '../const/errors';
import prisma from '@/client';
import { PrismaModelType } from '../types/prisma.type';

type PrismaModelDelegate = {
	[K in keyof PrismaClient]: PrismaClient[K] extends {
		findUnique: (args: { where: { id: number } }) => Promise<unknown>;
	}
		? PrismaClient[K]
		: never;
};

export async function entityIsExist<T extends keyof PrismaModelDelegate>(
	id: number,
	model: T,
): Promise<void | PrismaModelType<T>> {
	const delegateModel = prisma[model] as PrismaModelDelegate[T];
	const result = await delegateModel.findUnique({
		where: { id },
	});

	if (!result)
		throw ApiError.NotFoundError(ErrorMessages.notFound(model as string));

	return result as PrismaModelType<T>;
}
