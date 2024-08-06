import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import {
	ExtractJwt,
	Strategy as JwtStrategy,
	StrategyOptions,
} from 'passport-jwt';
import { prismaClient } from '@/modules/prisma';

const opts: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET,
};

export const comparePasswords = async (
	plainPassword: string,
	hashedPassword: string,
): Promise<boolean> => {
	try {
		return bcrypt.compare(plainPassword, hashedPassword);
	} catch (error) {
		return false;
	}
};

export const hashPassword = async (plainPassword: string): Promise<string> => {
	try {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
		return hashedPassword;
	} catch (error) {
		throw new Error('Error hashing password');
	}
};

passport.use(
	new JwtStrategy(opts, async (token, done) => {
		try {
			return done(null, token.user);
		} catch (error) {
			done(error);
		}
	}),
);

passport.use(
	'login',
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		async (email, password, done) => {
			try {
				const user = await prismaClient.user.findUniqueOrThrow({
					where: { email },
				});

				if (!user) {
					return done(null, false, { message: 'User not found' });
				}

				const validate = await comparePasswords(
					password,
					user.password,
				);

				if (!validate) {
					return done(null, false, { message: 'Wrong Password' });
				}
				return done(null, user, { message: 'Logged in Successfully' });
			} catch (error) {
				return done(error);
			}
		},
	),
);
