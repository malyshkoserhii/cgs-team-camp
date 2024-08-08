import { User } from '../user.types'; // Adjust the path as necessary

declare module 'express-serve-static-core' {
	interface Request {
		user?: User;
	}
}
