import { AuthErrorMessages } from '@/constants/auth-messages.constant';
import {
	GeneralErrorMessageList,
	HttpStatus,
} from '@/constants/http-errors.constant';
import { HttpError } from '@/helpers/http-error';
import { prisma } from '@/services/prisma/prisma.service';
import { UserType } from '@/types/user.types';
import { PassportStatic } from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.SECRET_KEY_JWT!,
};
export function useJwtStrategy(passport: PassportStatic): void {
	passport.use(
		new JwtStrategy(options, async function (
			jwt_payload: Pick<UserType, 'id'>,
			done: (error: Error | null, user?: UserType | false) => void,
		) {
			try {
				const user = await prisma.user.findUnique({
					where: { id: jwt_payload.id },
				});
				if (!user) {
					return done(
						HttpError(
							HttpStatus.NotFound,
							AuthErrorMessages.NO_USER_WITH_EMAIL,
						),
						false,
					);
				} else {
					return done(null, user);
				}
			} catch (error) {
				return done(
					HttpError(
						HttpStatus.BadRequest,
						GeneralErrorMessageList.BAD_REQUEST,
					),
					false,
				);
			}
		}),
	);
}
