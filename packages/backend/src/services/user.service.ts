import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as crypto from 'node:crypto';
import { IAuthResponse, IUser } from '@/types/user.type';
import { sendResetPasswordEmail } from '@/services/email.service';

const prisma = new PrismaClient();

export class UserService {
	async register(
		username: string,
		email: string,
		password: string,
	): Promise<IUser> {
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await prisma.user.create({
			data: {
				username,
				email,
				password: hashedPassword,
			},
		});
		return newUser;
	}

	async login(username: string, password: string): Promise<IAuthResponse> {
		const user = await prisma.user.findUnique({
			where: { username },
		});
		if (!user) throw new Error('User not found');

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) throw new Error('Invalid credentials');

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: '1h',
		});
		return { token, user };
	}

	async changePassword(userId: number, newPassword: string): Promise<void> {
		const hashedPassword = await bcrypt.hash(newPassword, 10);
		await prisma.user.update({
			where: { id: userId },
			data: { password: hashedPassword },
		});
	}

	async generateResetPasswordToken(email: string): Promise<void> {
		const user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			throw new Error('User not found');
		}

		const token = crypto.randomBytes(20).toString('hex');
		await prisma.user.update({
			where: { email },
			data: {
				resetPasswordToken: token,
				resetPasswordExpires: new Date(Date.now() + 3600000), // 1 hour
			},
		});

		await sendResetPasswordEmail(user.email, token);
	}

	async resetPassword(token: string, newPassword: string): Promise<void> {
		const user = await prisma.user.findFirst({
			where: {
				resetPasswordToken: token,
				resetPasswordExpires: {
					gt: new Date(),
				},
			},
		});

		if (!user) {
			throw new Error('Invalid or expired token');
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);
		await prisma.user.update({
			where: { id: user.id },
			data: {
				password: hashedPassword,
				resetPasswordToken: null,
				resetPasswordExpires: null,
			},
		});
	}
}

const userService = new UserService();
export default userService;
