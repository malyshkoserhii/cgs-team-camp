import { Prisma } from '@prisma/client';

import { ApiErrors } from '@/utils/ApiErrors';

export class PrismaErrors {
	static handlePrismaError(
		err: Prisma.PrismaClientKnownRequestError,
	): ApiErrors {
		switch (err.code) {
			case 'P1001':
				return ApiErrors.Conflict(
					'Unable to connect to the database. Please try again later.',
				);
			case 'P2002':
				return ApiErrors.Conflict('Record already exists.');
			case 'P2025':
				return ApiErrors.NotFound('Record not found.');
			default:
				return ApiErrors.InternalServerError();
		}
	}
}
