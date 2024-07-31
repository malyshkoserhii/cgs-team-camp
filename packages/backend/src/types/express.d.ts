import { IUserSession } from './user.type';

// express.d.ts
declare global {
	namespace Express {
		interface Request {
			user: IUserSession;
		}
	}
}

export {};
