import bcrypt from 'bcrypt';
import { PrismaClient, User } from '@prisma/client';
import { generateActivationToken, mailService } from './mail.service';
import jwt from 'jsonwebtoken';
import { AuthTokens } from '../types/auth.type';

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

		if (user.isActivated) {
			throw new Error('User is already activated');
		}

		return await prisma.user.update({
			where: { id: user.id },
			data: { activationToken: null, isActivated: true },
		});
	}

	async loginUser(
		email: string,
		password: string,
	): Promise<{ user: User; accessToken: string; refreshToken: string }> {
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

		const { accessToken, refreshToken } = this.generateTokens(
			user.id.toString(),
		);

		await prisma.user.update({
			where: { id: user.id },
			data: { refreshToken },
		});

		return { user, accessToken, refreshToken };
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
		const jwtSecret = process.env.JWT_SECRET!;
		const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET!;
		const jwtAccessExpiration = process.env.JWT_ACCESS_EXPIRATION || '15m';
		const jwtRefreshExpiration = process.env.JWT_REFRESH_EXPIRATION || '7d';

		const accessToken = jwt.sign({ userId }, jwtSecret, {
			expiresIn: jwtAccessExpiration,
		});
		const refreshToken = jwt.sign({ userId }, jwtRefreshSecret, {
			expiresIn: jwtRefreshExpiration,
		});

		return { accessToken, refreshToken };
	}

	async refreshToken(refreshToken: string): Promise<AuthTokens> {
		try {
			const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET!;

			const decoded = jwt.verify(refreshToken, jwtRefreshSecret) as {
				userId: string;
			};

			const user = await prisma.user.findUnique({
				where: { id: parseInt(decoded.userId) },
			});

			if (!user || user.refreshToken !== refreshToken) {
				throw new Error('Invalid refresh token');
			}

			const tokens = this.generateTokens(user.id.toString());

			await prisma.user.update({
				where: { id: user.id },
				data: { refreshToken: tokens.refreshToken },
			});

			return tokens;
		} catch (error) {
			throw new Error('Invalid refresh token');
		}
	}

	async getUserById(id: number): Promise<User> {
		try {
			const user = await prisma.user.findUnique({ where: { id } });
			if (!user) {
				throw new Error('User not found');
			}
			return user;
		} catch (error) {
			console.error('Error fetching user:', error);
			throw new Error('Error fetching user');
		}
	}

	async forgotPassword(email: string): Promise<void> {
		const user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			throw new Error('User not found');
		}

		const resetToken = generateActivationToken();
		const resetTokenExpiration = new Date(Date.now() + 3600000);

		await prisma.user.update({
			where: { id: user.id },
			data: {
				resetToken,
				resetTokenExpiration,
			},
		});

		mailService.sendPasswordResetEmail(user.email, resetToken);
	}

	async resetPassword(
		resetToken: string,
		newPassword: string,
	): Promise<void> {
		const user = await prisma.user.findFirst({
			where: {
				resetToken,
				resetTokenExpiration: {
					gt: new Date(),
				},
			},
		});

		if (!user) {
			throw new Error('Invalid reset token');
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);

		await prisma.user.update({
			where: { id: user.id },
			data: {
				password: hashedPassword,
				resetToken: null,
				resetTokenExpiration: null,
			},
		});
	}

	async changePassword(
		userId: number,
		currentPassword: string,
		newPassword: string,
	): Promise<void> {
		const user = await prisma.user.findUnique({ where: { id: userId } });

		if (!user) {
			throw new Error('User not found');
		}

		const isPasswordCorrect = await bcrypt.compare(
			currentPassword,
			user.password,
		);

		if (!isPasswordCorrect) {
			throw new Error('Invalid current password');
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);

		await prisma.user.update({
			where: { id: userId },
			data: { password: hashedPassword },
		});
	}
}
