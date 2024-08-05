import { User } from '@prisma/client';
import sgMail from '@sendgrid/mail';
import bcrypt, { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import prisma from '@/client';
import { ErrorMessages } from '@/utils/const/errors';
import {
	ACCESS_TOKEN_EXPIRED_TIME,
	REFRESH_TOKEN_EXPIRED_TIME,
} from '@/utils/const/jwt';
import { UserResponseDto } from '@/utils/dto/userResponse.dto';
import { ApiError } from '@/utils/helpers/ApiError.helper';
import { TokenI } from '@/utils/interfaces/auth.interface';
import { mailService } from './mail.service';

sgMail.setApiKey(process.env.SENDGRID_KEY!);

export default class UserService {
	async register(data: User): Promise<void> {
		const isUserExist = await prisma.user.findUnique({
			where: { email: data.email },
		});

		if (isUserExist)
			throw ApiError.ConflictError(ErrorMessages.ALREADY_EXISTS('User'));

		const id = uuidv4();
		const activationLink = `${process.env.FRONTEND_URL}/activate?token=${id}`;
		const hashedPassword = await bcrypt.hash(data.password, 10);
		const user = await prisma.user.create({
			data: {
				...data,
				password: hashedPassword,
				activationToken: id,
			},
		});
		await mailService.sendActivationEmail(user.email, activationLink);
	}

	async registerConfirmation(id: string): Promise<void> {
		const user = await prisma.user.findFirst({
			where: { activationToken: id },
		});

		if (!user) {
			throw ApiError.NotFoundError(ErrorMessages.notFound());
		}

		if (user.isActivated) {
			throw ApiError.BadRequestError('Already activated');
		}

		await prisma.user.update({
			where: { id: user.id },
			data: {
				isActivated: true,
				activationToken: null,
			},
		});
	}

	async login(
		user: User,
	): Promise<{ user: UserResponseDto; tokens: TokenI }> {
		const validatedUser = await this.validateUser(user);
		const tokens = this.generateTokens(validatedUser.id);
		await this.updateRefreshToken(validatedUser.id, tokens.refreshToken);

		return { user: new UserResponseDto(validatedUser), tokens };
	}

	async validateUser({
		email,
		password,
	}: {
		email: string;
		password: string;
	}): Promise<User & { todos: { id: number }[] }> {
		const user = await prisma.user.findUnique({
			where: { email },
			include: { todos: { select: { id: true } } },
		});
		if (!user) {
			throw ApiError.AuthorizationError(
				ErrorMessages.INVALID_CREDENTIALS,
			);
		}
		const isCorrectPassword = await compare(password, user.password);
		if (!isCorrectPassword) {
			throw ApiError.AuthorizationError(
				ErrorMessages.INVALID_CREDENTIALS,
			);
		}

		if (!user.isActivated) {
			throw ApiError.AuthorizationError(
				'To complete your registration and activate your account, please confirm your email address.',
			);
		}

		return user;
	}

	async logout(userId: number): Promise<void> {
		await prisma.user.update({
			where: { id: userId },
			data: { refreshToken: null },
		});
	}

	async refreshTokens(userId: number, refreshToken: string): Promise<TokenI> {
		const user = await prisma.user.findUnique({ where: { id: userId } });
		if (!user || user.refreshToken !== refreshToken) {
			throw ApiError.AuthorizationError();
		}

		const tokens = this.generateTokens(user.id);
		await this.updateRefreshToken(user.id, tokens.refreshToken);

		return tokens;
	}

	generateTokens(userId: number): TokenI {
		const payload = { id: userId };
		const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
			expiresIn: ACCESS_TOKEN_EXPIRED_TIME,
		});
		const refreshToken = jwt.sign(payload, process.env.JWT_SECRET!, {
			expiresIn: REFRESH_TOKEN_EXPIRED_TIME,
		});
		return { accessToken, refreshToken };
	}

	async updateRefreshToken(
		userId: number,
		refreshToken: string,
	): Promise<void> {
		const hashedToken = await bcrypt.hash(refreshToken, 10);
		await prisma.user.update({
			where: { id: userId },
			data: { refreshToken: hashedToken },
		});
	}

	async currentUser(id: number): Promise<UserResponseDto> {
		const user = await prisma.user.findUnique({
			where: { id },
			include: { todos: { select: { id: true } } },
		});

		if (!user) {
			throw ApiError.AuthorizationError();
		}

		return new UserResponseDto(user);
	}

	async requestPasswordReset(email: string): Promise<void> {
		const user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			throw ApiError.NotFoundError(ErrorMessages.notFound());
		}

		const resetToken = uuidv4();

		await prisma.user.update({
			where: { email },
			data: {
				resetToken,
				resetTokenExpiration: new Date(Date.now() + 3600000),
			},
		});

		const resetLink = `${process.env.FRONTEND_URL}/change-password-confirm?token=${resetToken}`;
		await mailService.sendPasswordResetEmail(email, resetLink);
	}

	async resetPassword(
		resetToken: string,
		newPassword: string,
	): Promise<void> {
		const user = await prisma.user.findUnique({
			where: {
				resetToken: resetToken,
				resetTokenExpiration: { gte: new Date() },
			},
		});

		if (!user) {
			throw ApiError.BadRequestError('Invalid or expired reset token');
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

	async updateUser(
		id: number,
		data: Partial<User>,
	): Promise<UserResponseDto> {
		if (data.password) {
			data.password = await bcrypt.hash(data.password, 10);
		}

		const user = await prisma.user.update({
			where: { id },
			include: { todos: { select: { id: true } } },
			data,
		});

		return new UserResponseDto(user);
	}
}
