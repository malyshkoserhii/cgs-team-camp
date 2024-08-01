import { PrismaClient } from '@prisma/client';

export type PrismaModelDelegate = {
	[T in keyof PrismaClient]: PrismaClient[T] extends {
		findUnique: (args: { where: { id: number } }) => Promise<unknown>;
	}
		? PrismaClient[T]
		: never;
};
