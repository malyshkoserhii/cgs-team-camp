import { HttpError } from '@/helpers/http-error';
import {
	CreateUserType,
	UserNoSensitiveData,
	UserType,
} from '@/types/user.types';
import MailService from './mail.service';
import { prisma } from './prisma/prisma.service';

export default class AuthService {
	private mailService: MailService;

	constructor(mailService: MailService) {
		this.mailService = mailService;
	}

	removeSensitiveInfo(user: UserType): UserNoSensitiveData {
		const { password: _, ...userNoSensetiveData } = user;
		return userNoSensetiveData;
	}

	async register(data: CreateUserType): Promise<UserNoSensitiveData> {
		const checkUser = await prisma.user.findFirst({
			where: {
				OR: [{ username: data.username }, { email: data.email }],
			},
		});

		if (checkUser) {
			throw HttpError(409, 'User alredy exists');
		}
		const newUser = await prisma.user.create({ data: { ...data } });

		const emailVerification = await prisma.emailVerification.create({
			data: {
				userId: newUser.id,
			},
		});

		await this.mailService.sendVerificationEmail(
			newUser.email,
			emailVerification.id,
		);

		return this.removeSensitiveInfo(newUser);
	}
	async verifyEmail(
		emailVerificationId: string,
	): Promise<UserNoSensitiveData> {
		const emailVerification = await prisma.emailVerification.findUnique({
			where: {
				id: emailVerificationId,
			},
		});

		if (!emailVerification) {
			throw HttpError(404, 'Not found');
		}

		await prisma.emailVerification.delete({ where: emailVerification });

		const updatedUser = await prisma.user.update({
			where: {
				id: emailVerification?.userId,
			},
			data: {
				emailVerified: true,
			},
		});
		return this.removeSensitiveInfo(updatedUser);
	}
	async changePassword(
		user: UserType,
		newPassword: string,
	): Promise<UserNoSensitiveData> {
		const updatedUser = await prisma.user.update({
			where: { id: user.id },
			data: { password: newPassword },
		});

		return this.removeSensitiveInfo(updatedUser);
	}
	async updateUser(
		user: UserType,
		username: string,
	): Promise<UserNoSensitiveData> {
		const newUser = await prisma.user.update({
			where: { id: user.id },
			data: { username: username },
		});
		return this.removeSensitiveInfo(newUser);
	}
}
