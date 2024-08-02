import { User } from '@prisma/client';

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			TEST: string;
			DATABASE_URL: string;
		}
	}
}

declare module 'express-serve-static-core' {
	interface Request {
		entity?: PrismaModelType<unknown>;
		user: User;
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
