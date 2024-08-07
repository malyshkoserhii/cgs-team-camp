import passport, { PassportStatic } from 'passport';

import { IStrategyOptions, Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

import { prismaClient } from '@/prisma/prismaClient';
import { User } from '@prisma/client';
import { ApiErrors } from '@/utils';

// Local strategy
const optionsLocal: IStrategyOptions = {
	usernameField: 'email',
	passwordField: 'password',
};

export const useLocalStrategy = (passport: PassportStatic): void => {
	passport.use(
		new LocalStrategy(optionsLocal, async function (
			email: string,
			password: string,
			done: (error: Error | null, user?: User | boolean) => void,
		) {
			try {
				const user = await prismaClient.user.findUnique({
					where: { email: email },
				});

				if (!user) {
					return done(
						ApiErrors.NotFound('No user with this email'),
						false,
					);
				}
				if (password !== user.password) {
					return done(
						ApiErrors.Unauthorized('Email or password is wrong'),
					);
				}

				return done(null, user);
			} catch (err: unknown) {
				return done(err as Error);
			}
		}),
	);
};

// JWT strategy
const optionsJwt = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.SECRET_KEY_JWT!,
};

export const useJwtStrategy = (passport: PassportStatic): void => {
	passport.use(
		new JwtStrategy(optionsJwt, async function (
			jwt_payload: Pick<User, 'id'>,
			done: (error: Error | null, user?: User | false) => void,
		) {
			try {
				const user = await prismaClient.user.findUnique({
					where: { id: jwt_payload.id },
				});
				if (!user) {
					return done(
						ApiErrors.NotFound('No user with this email'),
						false,
					);
				} else {
					return done(null, user);
				}
			} catch (error) {
				return done(ApiErrors.BadRequest('Bad request'), false);
			}
		}),
	);
};

// Create passport service
const passportService: PassportStatic = passport;

useLocalStrategy(passportService);
useJwtStrategy(passportService);

export default passportService;
