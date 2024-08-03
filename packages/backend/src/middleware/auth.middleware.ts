import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import {
	ExtractJwt,
	Strategy as JwtStrategy,
	StrategyOptions,
} from 'passport-jwt';
import prisma from '@/client';
import { ErrorMessages } from '@/utils/const/errors';
import { StatusCodes } from '@/utils/const/statusCodes';
import { ApiError } from '@/utils/helpers/ApiError.helper';

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
	throw new Error('JWT_SECRET is not defined');
}

const options: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: jwtSecret,
};

passport.use(
	new JwtStrategy(options, async (payload, done) => {
		try {
			const user = await prisma.user.findUnique({
				where: { id: payload.id },
			});

			if (!user) {
				return done(null, false);
			}

			return done(null, user);
		} catch (error) {
			return done(error, false);
		}
	}),
);

export function authenticateJwt(
	req: Request,
	res: Response,
	next: NextFunction,
): void {
	passport.authenticate(
		'jwt',
		function (err: ApiError, user: User, _: unknown) {
			if (err) return next(err);
			if (!user) {
				res.status(StatusCodes.unauthorized).json({
					error: ErrorMessages.unauthorized,
					code: StatusCodes.unauthorized,
				});
			} else {
				req.user = user;
				next();
			}
		},
	)(req, res, next);
}
