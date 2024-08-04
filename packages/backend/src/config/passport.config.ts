import passport from 'passport';
import {
	Strategy as JwtStrategy,
	ExtractJwt,
	VerifiedCallback,
} from 'passport-jwt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type JwtPayload = {
	userId: string;
};

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET || '',
};

passport.use(
	new JwtStrategy(
		options,
		async (jwt_payload: JwtPayload, done: VerifiedCallback) => {
			try {
				const user = await prisma.user.findUnique({
					where: { id: jwt_payload.userId },
				});
				if (user) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			} catch (error) {
				return done(error, false);
			}
		},
	),
);

export default passport;
