import passport, { PassportStatic } from 'passport';

import { IStrategyOptions, Strategy as LocalStrategy } from 'passport-local';

import { prismaClient } from '@/prisma/prismaClient';
import { User } from '@prisma/client';
import { ApiErrors } from '@/utils';

// Local strategy
const optionsLocal: IStrategyOptions = {
	usernameField: 'email',
	passwordField: 'password',
};

export function useLocalStrategy(passport: PassportStatic): void {
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
}

// Create passport service
const passportService: PassportStatic = passport;

useLocalStrategy(passportService);

export default passportService;
