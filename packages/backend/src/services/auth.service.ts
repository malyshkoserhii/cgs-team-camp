import { ActivationToken, User } from '@prisma/client';

import { prismaClient } from '@/prisma/prismaClient';
import { MailService } from '@/services/mail.service';

export class AuthService {
	constructor(private mailService: MailService) {}

	async getUserDataToSend(data: User): Promise<Omit<User, 'password'>> {
		const { password: _, ...userDataToSend } = data;
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

	async updateUser(id: string, data: User): Promise<User | null> {
		return prismaClient.user.update({ where: { id }, data });
	}

	async createActivationToken(userId: string): Promise<ActivationToken> {
		return prismaClient.activationToken.create({ data: { userId } });
	}
}
