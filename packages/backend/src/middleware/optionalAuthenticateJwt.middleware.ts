import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

export const optionalAuthenticateJwt = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	passport.authenticate(
		'jwt',
		{ session: false },
		(err: unknown, user: User) => {
			if (err) {
				return next(err);
			}
			req.user = user || null;
			next();
		},
	)(req, res, next);
};
