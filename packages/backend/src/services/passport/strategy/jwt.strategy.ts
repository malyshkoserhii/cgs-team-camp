import {
	ExtractJwt,
	Strategy,
	StrategyOptionsWithoutRequest,
} from 'passport-jwt';
import { PrismaClient, User } from '@prisma/client';
import 'dotenv/config';
import { PassportStatic } from 'passport';
import { DoneFncType } from './local.strategy';
import { authMessages, errorMessages } from '@/utils/const/errorMessages';
import { StatusCodes } from '@/utils/const/statusCode';
import { HttpError } from '@/helpers/httpError';

const prisma = new PrismaClient();

const { JWT_SECRET } = process.env;

const options: StrategyOptionsWithoutRequest = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: JWT_SECRET!,
};

export function useJwtStrategy(passport: PassportStatic): void {
	passport.use(
		new Strategy(options, async function (
			jwtPayload: Pick<User, 'id'>,
			done: DoneFncType,
		) {
			try {
				const user = await prisma.user.findUnique({
					where: { id: jwtPayload.id },
				});

				if (!user) {
					return done(
						new HttpError(
							authMessages.notFound,
							StatusCodes.NotFound,
						),
						false,
					);
				}

				return done(null, user);
			} catch (error) {
				return done(
					new HttpError(
						errorMessages[StatusCodes.BadRequest],
						StatusCodes.BadRequest,
					),
					false,
				);
			}
		}),
	);
}
