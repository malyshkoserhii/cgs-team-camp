import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { responseMessages } from '@/const/responseMessages';

const prisma = new PrismaClient();

type SafeUser = Pick<User, 'id' | 'email' | 'name' | 'createdAt' | 'updatedAt'>;

export default class AuthService {
	async getUserById(id: string): Promise<SafeUser | null> {
		const user = await prisma.user.findUnique({
			where: { id },
			select: {
				id: true,
				email: true,
				name: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		return user;
	}

	async registerUser(
		email: string,
		password: string,
		name?: string,
	): Promise<User> {
		const hashedPassword = await bcrypt.hash(password, 10);
		const verificationToken = uuidv4();
		return prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				name,
				verificationToken,
				isVerified: false,
			},
		});
	}

	async verifyEmail(token: string): Promise<boolean> {
		const user = await prisma.user.findFirst({
			where: { verificationToken: token },
		});

		if (!user) {
			return false;
		}

		await prisma.user.update({
			where: { id: user.id },
			data: {
				isVerified: true,
				verificationToken: null,
			},
		});

		return true;
	}

	async resendVerificationEmail(email: string): Promise<string | null> {
		const user = await prisma.user.findUnique({ where: { email } });

		if (!user || user.isVerified) {
			return null;
		}

		const verificationToken = uuidv4();
		await prisma.user.update({
			where: { id: user.id },
			data: { verificationToken },
		});

		return verificationToken;
	}

	async loginUser(
		email: string,
		password: string,
	): Promise<{
		user: User;
		tokens: { accessToken: string; refreshToken: string };
	} | null> {
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return null;
		}

		if (!user.isVerified) {
			throw new Error(responseMessages.EMAIL_NOT_VERIFIED);
		}

		const tokens = this.generateTokens(user.id);
		await this.saveOAuth(user.id, tokens.accessToken, tokens.refreshToken);

		return { user, tokens };
	}

	async logoutUser(refreshToken: string): Promise<void> {
		await prisma.oAuth.deleteMany({ where: { refreshToken } });
	}

	async changePassword(
		userId: string,
		oldPassword: string,
		newPassword: string,
	): Promise<boolean> {
		const user = await prisma.user.findUnique({ where: { id: userId } });
		if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
			return false;
		}

		const hashedNewPassword = await bcrypt.hash(newPassword, 10);
		await prisma.user.update({
			where: { id: userId },
			data: { password: hashedNewPassword },
		});

		return true;
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
			throw new Error('JWT secrets are not defined in the environment');
		}

		const accessToken = jwt.sign({ userId }, jwtSecret, {
			expiresIn: jwtAccessExpiration,
		});
		const refreshToken = jwt.sign({ userId }, jwtRefreshSecret, {
			expiresIn: jwtRefreshExpiration,
		});
		return { accessToken, refreshToken };
	}

	private async saveOAuth(
		userId: string,
		accessToken: string,
		refreshToken: string,
	): Promise<void> {
		await prisma.oAuth.create({
			data: {
				userId,
				accessToken,
				refreshToken,
			},
		});
	}

	async verifyRefreshToken(refreshToken: string): Promise<string | null> {
		const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

		if (!jwtRefreshSecret) {
			throw new Error(
				'JWT refresh secret is not defined in the environment',
			);
		}

		try {
			const decoded = jwt.verify(refreshToken, jwtRefreshSecret) as {
				userId: string;
			};
			const oauth = await prisma.oAuth.findFirst({
				where: { refreshToken, userId: decoded.userId },
			});
			if (!oauth) {
				return null;
			}
			return decoded.userId;
		} catch (error) {
			return null;
		}
	}

	async refreshTokens(
		refreshToken: string,
	): Promise<{ accessToken: string; refreshToken: string } | null> {
		const userId = await this.verifyRefreshToken(refreshToken);
		if (!userId) {
			return null;
		}

		const newTokens = this.generateTokens(userId);
		await this.saveOAuth(
			userId,
			newTokens.accessToken,
			newTokens.refreshToken,
		);
		await prisma.oAuth.deleteMany({ where: { refreshToken } });

		return newTokens;
	}

	async forgotPassword(email: string): Promise<string | null> {
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			return null;
		}

		const resetToken = uuidv4();
		const resetTokenExpires = new Date(Date.now() + 3600000);

		await prisma.user.update({
			where: { id: user.id },
			data: {
				resetToken,
				resetTokenExpires,
			},
		});

		return resetToken;
	}

	async resetPassword(
		resetToken: string,
		newPassword: string,
	): Promise<boolean> {
		const user = await prisma.user.findFirst({
			where: {
				resetToken,
				resetTokenExpires: { gt: new Date() },
			},
		});

		if (!user) {
			return false;
		}

		const hashedNewPassword = await bcrypt.hash(newPassword, 10);
		await prisma.user.update({
			where: { id: user.id },
			data: {
				password: hashedNewPassword,
				resetToken: null,
				resetTokenExpires: null,
			},
		});

		return true;
	}
}
