import { HttpError } from '@/helpers/httpError';
import { authMessages } from '@/utils/const/errorMessages';
import { StatusCodes } from '@/utils/const/statusCode';
import { PrismaClient, User } from '@prisma/client';
import { PassportStatic } from 'passport';
import { IStrategyOptions, Strategy as LocalStrategy } from 'passport-local';

const prisma = new PrismaClient();

export type DoneFncType = (error: Error | null, user?: User | boolean) => void;

const options: IStrategyOptions = {
	usernameField: 'email',
	passwordField: 'password',
};

export function useLocalStrategy(passport: PassportStatic): void {
	passport.use(
		new LocalStrategy(options, async function (
			email: string,
			password: string,
			done: DoneFncType,
		) {
			try {
				const user = await prisma.user.findUnique({
					where: { email: email },
				});

				if (!user) {
					return done(
						new HttpError(
							authMessages.doesNotExist,
							StatusCodes.BadRequest,
						),
						false,
					);
				}

				if (password !== user.password) {
					return done(
						new HttpError(
							authMessages.wrongPasswordOrEmail,
							StatusCodes.BadRequest,
						),
						false,
					);
				}

				return done(null, user);
			} catch (error) {
				return done(error as Error);
			}
		}),
	);
}
