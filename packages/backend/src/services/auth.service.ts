import { ActivationToken, ResetPasswordToken, User } from '@prisma/client';

import { prismaClient } from '@/prisma/prismaClient';
import { MailService } from '@/services/mail.service';

export class AuthService {
	constructor(private mailService: MailService) {}

	async getUserDataToSend(
		data: User,
	): Promise<Omit<User, 'password' | 'id' | 'isEmailVerified'>> {
		const {
			password: _password,
			id: _id,
			isEmailVerified: _isEmailVerified,
			...userDataToSend
		} = data;
		return userDataToSend;
	}

	async createUser(data: User): Promise<User> {
		return prismaClient.user.create({ data });
	}

	async findUserById(id: string): Promise<User | null> {
		return prismaClient.user.findUnique({ where: { id } });
	}

	async findUserByEmail(email: string): Promise<User | null> {
		return prismaClient.user.findUnique({
			where: { email },
		});
	}

	async updateUserById(
		id: string,
		data: Partial<User>,
	): Promise<User | null> {
		return prismaClient.user.update({ where: { id }, data });
	}

	async createActivationToken(userId: string): Promise<ActivationToken> {
		return prismaClient.activationToken.create({ data: { userId } });
	}

	async verifyActivationToken(
		token: string,
	): Promise<ActivationToken | null> {
		return prismaClient.activationToken.findUnique({ where: { token } });
	}

	async deleteActivationToken(token: string): Promise<void> {
		prismaClient.activationToken.delete({
			where: { token },
		});
	}

	async createResetPasswordToken(
		userId: string,
	): Promise<ResetPasswordToken> {
		return prismaClient.resetPasswordToken.create({ data: { userId } });
	}

	async deleteResetPasswordToken(token: string): Promise<void> {
		prismaClient.resetPasswordToken.delete({
			where: { token },
		});
	}

	async verifyResetPasswordToken(
		token: string,
	): Promise<ActivationToken | null> {
		return prismaClient.resetPasswordToken.findUnique({ where: { token } });
	}
}
