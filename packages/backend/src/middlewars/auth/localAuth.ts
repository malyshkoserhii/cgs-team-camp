import { HttpError } from '@/helpers/http-error';
import { prisma } from '@/services/prisma/prisma.service';
import { User } from '@prisma/client';
import passport from 'passport';
import { IStrategyOptions, Strategy as LocalStrategy } from 'passport-local';

const options: IStrategyOptions = {
	usernameField: 'email',
	passwordField: 'password',
};

passport.use(
	new LocalStrategy(options, async function (
		email: string,
		password: string,
		done: (error: Error | null, user?: User | boolean) => void,
	) {
		try {
			const user = await prisma.user.findUnique({
				where: { email: email },
			});

			if (!user) {
				return done(HttpError(404, 'No user with this email'), false);
			}
			if (password !== user.password) {
				return done(HttpError(401, 'Email or password is wrong'));
			}

			return done(null, user);
		} catch (err: unknown) {
			return done(err as Error);
		}
	}),
);

export const localAuth = passport.authenticate('local', {
	session: false,
});
