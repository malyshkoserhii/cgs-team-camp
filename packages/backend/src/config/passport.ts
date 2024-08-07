import {
	Strategy as JwtStrategy,
	ExtractJwt,
	StrategyOptions,
} from 'passport-jwt';
import passport from 'passport';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const jwtOptions: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET!,
};

passport.use(
	new JwtStrategy(jwtOptions, async (payload, done) => {
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

export default passport;
