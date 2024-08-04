import passport from '../config/passport.config';
import { responseCodes } from '@/const/responseCodes';
import { responseMessages } from '@/const/responseMessages';

import type { Request, Response, NextFunction } from 'express';
import type { User } from '@prisma/client';

export const authenticateJWT = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	passport.authenticate(
		'jwt',
		{ session: false },
		(error: Error, user: User) => {
			if (error) {
				return next(error);
			}
			if (!user) {
				return res
					.status(responseCodes.UNAUTHORIZED)
					.json({ message: responseMessages.UNAUTHORIZED });
			}
			req.user = user;
			next();
		},
	)(req, res, next);
};
