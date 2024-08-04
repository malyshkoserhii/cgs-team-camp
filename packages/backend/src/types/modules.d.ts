import type { User as PrismaUser } from '@prisma/client';

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_URL: string;
			JWT_SECRET: string;
			JWT_REFRESH_SECRET: string;
			FRONTEND_URL: string;
			EMAIL_HOST: string;
			EMAIL_PORT: string;
			EMAIL_USER: string;
			EMAIL_PASS: string;
			JWT_ACCESS_EXPIRATION: string;
			JWT_REFRESH_EXPIRATION: string;
		}
	}
	namespace Express {
		interface Request {
			user?: PrismaUser;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
