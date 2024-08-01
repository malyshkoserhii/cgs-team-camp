import { PrismaClient } from '@prisma/client';

export type PrismaModelDelegate = {
	[K in keyof PrismaClient]: PrismaClient[K] extends {
		findUnique: (args: { where: { id: number } }) => Promise<unknown>;
	}
		? PrismaClient[K]
		: never;
};
