import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import {
	Strategy as JwtStrategy,
	ExtractJwt,
	StrategyOptions,
} from 'passport-jwt';
import { PrismaClient, User } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const jwtOptions: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET || 'fallback_secret',
};

passport.use(
	new JwtStrategy(jwtOptions, async (payload, done) => {
		try {
			const user = await prisma.user.findUnique({
				where: { id: payload.id },
			});
			if (user) {
				return done(null, user);
			}
			return done(null, false);
		} catch (error) {
			return done(error, false);
		}
	}),
);

export const generateTokens = (
	user: User,
): { accessToken: string; refreshToken: string } => {
	const accessToken = jwt.sign(
		{ id: user.id },
		process.env.JWT_SECRET as string,
		{ expiresIn: '15m' },
	);
	const refreshToken = jwt.sign(
		{ id: user.id },
		process.env.REFRESH_TOKEN_SECRET as string,
		{ expiresIn: '7d' },
	);
	return { accessToken, refreshToken };
};

export const verifyRefreshToken = async (
	refreshToken: string,
): Promise<number> => {
	try {
		const payload = jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET as string,
		) as { id: number };
		const user = await prisma.user.findUnique({
			where: { id: payload.id },
		});
		if (!user || user.refreshToken !== refreshToken) {
			throw new Error('Invalid refresh token');
		}
		return user.id;
	} catch (error) {
		throw new Error('Invalid refresh token');
	}
};

export const authenticateJwt = (
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

export const authorizeUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const todoId = parseInt(req.params.id);
		const userId = (req.user as User).id;

		const todo = await prisma.todo.findUnique({
			where: { id: todoId },
			select: { userId: true },
		});

		if (!todo) {
			res.status(404).json({ message: 'Todo not found' });
			return;
		}

		if (todo.userId === userId) {
			next();
		} else {
			res.status(403).json({ message: 'Forbidden' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
};
