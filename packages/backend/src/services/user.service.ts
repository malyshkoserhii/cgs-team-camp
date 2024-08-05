import bcrypt from 'bcrypt';
import { PrismaClient, User } from '@prisma/client';
import { generateActivationToken, mailService } from './email.service';

const prisma = new PrismaClient();

export default class AuthService {
	async registerUser(
		email: string,
		password: string,
		name: string,
	): Promise<User> {
		const hashedPassword = await bcrypt.hash(password, 10);
		const activationToken = generateActivationToken();

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
	}
}
