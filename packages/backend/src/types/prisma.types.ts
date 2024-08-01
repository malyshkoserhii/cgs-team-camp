import { PrismaPromise } from '@prisma/client';

export interface PrismaModelWithId<T> {
	findUniqueOrThrow: (args: {
		where: { id: number };
	}) => PrismaPromise<T | null>;
}
