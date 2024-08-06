import bcrypt from 'bcrypt';
import { PrismaClient, User } from '@prisma/client';
import { generateActivationToken, mailService } from './email.service';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default class UserService {
	async registerUser(
		email: string,
		password: string,
		name: string,
	): Promise<User> {
		const hashedPassword = await bcrypt.hash(password, 10);
		const activationToken = generateActivationToken();

		try {
			const user = await prisma.user.create({
				data: {
					email,
					password: hashedPassword,
					name,
					activationToken,
				},
			});

			mailService.sendActivationEmail(user.email, activationToken);
			return user;
		} catch (error) {
			throw new Error('Failed to register user');
		}
	}

	async activateUser(activationToken: string): Promise<User> {
		const user = await prisma.user.findFirst({
			where: { activationToken },
		});

		if (!user) {
			throw new Error('Invalid activation token');
		}

		return await prisma.user.update({
			where: { id: user.id },
			data: { activationToken: null, isActivated: true },
		});
	}

	async loginUser(email: string, password: string): Promise<User> {
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			throw new Error('User not found');
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect) {
			throw new Error('Invalid password');
		}

		return user;
	}

	async logoutUser(userId: number): Promise<void> {
		await prisma.user.update({
			where: { id: userId },
			data: { refreshToken: null },
		});
	}

	private generateTokens(userId: string): {
		accessToken: string;
		refreshToken: string;
	} {
		const jwtSecret = process.env.JWT_SECRET;
		const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
		const jwtAccessExpiration = process.env.JWT_ACCESS_EXPIRATION;
		const jwtRefreshExpiration = process.env.JWT_REFRESH_EXPIRATION;

		if (!jwtSecret || !jwtRefreshSecret) {
			throw new Error('JWT secrets are not provided');
		}

		const accessToken = jwt.sign({ userId }, jwtSecret, {
			expiresIn: jwtAccessExpiration,
		});
		const refreshToken = jwt.sign({ userId }, jwtRefreshSecret, {
			expiresIn: jwtRefreshExpiration,
		});

		return { accessToken, refreshToken };
	}

	async refreshToken(
		refreshToken: string,
	): Promise<{ accessToken: string; refreshToken: string }> {
		try {
			const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

			if (!jwtRefreshSecret) {
				throw new Error('JWT refresh secret is not provided');
			}

			const decoded = jwt.verify(refreshToken, jwtRefreshSecret) as {
				userId: string;
			};
			const { userId } = decoded;

			const { accessToken, refreshToken: newRefreshToken } =
				this.generateTokens(userId);

			return { accessToken, refreshToken: newRefreshToken };
		} catch (error) {
			throw new Error('Invalid refresh token');
		}
	}
}
