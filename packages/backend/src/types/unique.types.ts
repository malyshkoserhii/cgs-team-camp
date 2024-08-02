import { PrismaPromise } from '@prisma/client';

export interface EntityWithId<T> {
  findUnique: (args: { where: { id: number } }) => PrismaPromise<T | null>;
}