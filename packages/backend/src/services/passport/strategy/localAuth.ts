import { AuthErrorMessages } from '@/constants/auth-messages.constant';
import { HttpStatus } from '@/constants/http-errors.constant';
import { HttpError } from '@/helpers/http-error';
import { prisma } from '@/services/prisma/prisma.service';
import { User } from '@prisma/client';
import { PassportStatic } from 'passport';
import { IStrategyOptions, Strategy as LocalStrategy } from 'passport-local';

const options: IStrategyOptions = {
	usernameField: 'email',
	passwordField: 'password',
};

export function useLocalStrategy(passport: PassportStatic): void {
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
					return done(
						HttpError(
							HttpStatus.NotFound,
							AuthErrorMessages.NO_USER_WITH_EMAIL,
						),
						false,
					);
				}
				if (password !== user.password) {
					return done(
						HttpError(
							HttpStatus.Unauthorized,
							AuthErrorMessages.WRONG_EMAIL_OR_PASSWORD,
						),
					);
				}

				return done(null, user);
			} catch (err: unknown) {
				return done(err as Error);
			}
		}),
	);
}
