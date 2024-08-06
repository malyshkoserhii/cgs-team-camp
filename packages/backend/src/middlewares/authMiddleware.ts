import { User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport'; // Path to your passport configuration

export const authenticateJWT = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	passport.authenticate(
		'jwt',
		{ session: false },
		(err: Error, user: User) => {
			if (err) return next(err);
			if (!user) return res.sendStatus(403);
			req.user = user;
			next();
		},
	)(req, res, next);
};
