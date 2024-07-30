import { PrismaClient } from '@prisma/client';

export type PrismaModelType<T extends keyof PrismaClient> =
	PrismaClient[T] extends PrismaClient<infer U> ? U : never;
