import { PrismaClient } from '@prisma/client';

export type PrismaModel<T extends keyof PrismaClient> =
	PrismaClient[T] extends PrismaClient<infer U> ? U : never;
