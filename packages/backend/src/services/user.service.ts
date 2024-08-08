import crypto from 'crypto';
import bcrypt from 'bcrypt';

import { IUser, IUserSession } from '@/types/user.type';
import Service from './index.service';
import { Prisma, User } from '@prisma/client';
import sendEmail from '@/utils/email';
import {
	activateAccTemplate,
	reqPasswordTemplate,
} from '@/utils/email/templates';
import { ActivateAccData, ResetPasswordData } from '@/types/token.type';
import TokenService from './token.service';
import { hashPassword } from '@/routes/middlewares/auth.middlewares';
import { prismaClient } from '@/modules/prisma';

export default class UserService extends Service {
	userRepository = prismaClient.user;
	tokenService = new TokenService();
	selectTemplate: Prisma.UserSelect = {
		id: true,
		name: true,
		email: true,
		active: true,
		Todo: true,
	};

	async create(user: IUser): Promise<User> {
		const newUser: User = await this.userRepository.create({
			data: user,
			select: this.selectTemplate,
		});
		const activateToken = crypto.randomBytes(32).toString('hex');
		const hash = await bcrypt.hash(activateToken, 10);

		try {
			const token = await this.tokenService.findOne(newUser.id);
			await this.tokenService.deleteOne(token);
		} catch (e) {}

		await this.tokenService.create(hash, newUser.id);

		const link = `${process.env.BACK_URL}/api/user/activate/?token=${activateToken}&id=${newUser.id}`;
		sendEmail(
			newUser.email,
			'Account verification',
			{
				name: newUser.name,
				link,
			},
			activateAccTemplate,
		);
		return newUser;
	}

	async findOne(userEmail: string): Promise<IUserSession> {
		const existUser = await this.userRepository.findUniqueOrThrow({
			where: { email: userEmail },
		});

		return existUser;
	}

	async requestPasswordReset(userEmail: string): Promise<string> {
		const { id, email, name } = await this.findOne(userEmail);
		try {
			const token = await this.tokenService.findOne(id);
			await this.tokenService.deleteOne(token);
		} catch (e) {}

		const resetToken = crypto.randomBytes(32).toString('hex');
		const hash = await bcrypt.hash(resetToken, 10);

		this.tokenService.create(hash, id);

		const link = `${process.env.CLIENT_URL}/reset-password/?token=${resetToken}&id=${id}`;
		sendEmail(
			email,
			'Password Reset Request',
			{
				name: name,
				link,
			},
			reqPasswordTemplate,
		);
		return link;
	}

	async passwordReset({
		userId,
		token,
		password,
	}: ResetPasswordData): Promise<void> {
		const passwordResetToken = await this.tokenService.findOne(userId);

		if (
			!passwordResetToken ||
			passwordResetToken.createAt > passwordResetToken.expireAt
		) {
			throw new Error('TOKEN_EXPIRED');
		}

		const isValid = await bcrypt.compare(token, passwordResetToken.token);
		if (!isValid) {
			throw new Error('TOKEN_EXPIRED');
		}

		const newPass = await hashPassword(password);
		await this.userRepository.update({
			where: {
				id: userId,
			},
			data: { password: newPass },
		});

		this.tokenService.deleteOne(passwordResetToken);
	}

	async activateAcc({ id, token }: ActivateAccData): Promise<void> {
		await this.userRepository.update({
			where: {
				id,
			},
			data: { active: true },
		});

		const activateToken = await this.tokenService.findOne(id);

		if (!activateToken) {
			throw new Error('TOKEN_EXPIRED');
		}

		const isValid = await bcrypt.compare(token, activateToken.token);
		if (!isValid) {
			throw new Error('TOKEN_EXPIRED');
		}

		await this.tokenService.deleteOne(activateToken);
	}
}
