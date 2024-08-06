import { User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import passport from '../config/passport';

export const authenticateJWT = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	passport.authenticate(
		'jwt',
		{ session: false },
		(err: Error, user: User) => {
			if (err || !user) {
				return res.status(401).json({ message: 'Unauthorized' });
			}
			req.user = user;
			next();
		},
	)(req, res, next);
};

export const authorizeUser = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	if (req.user && (req.user as User).id === parseInt(req.params.userId)) {
		next();
	} else {
		res.status(403).json({ message: 'Forbidden' });
	}
};
