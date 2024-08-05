import { HttpError } from '@/helpers/http-error';
import {
	ChangePasswordType,
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
		data: ChangePasswordType,
	): Promise<UserNoSensitiveData> {
		const checkUser = await prisma.user.findFirst({
			where: {
				password: data.oldPassword,
			},
		});
		if (!checkUser) {
			throw HttpError(403, 'Wrong password');
		}
		const updatedUser = await prisma.user.update({
			where: { id: user.id },
			data: { password: data.newPassword },
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
	async forgetPassword(email: string): Promise<UserNoSensitiveData> {
		const user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			throw HttpError(404, 'Not found');
		}

		const passwordResetRequest = await prisma.passwordReset.create({
			data: {
				userId: user.id,
			},
		});
		await this.mailService.sendForgotPasswordEmail(
			user.email,
			passwordResetRequest.id,
		);

		return this.removeSensitiveInfo(user);
	}
	async resetPassword(
		passwordResetRequestId: string,
		newPassword: string,
	): Promise<UserNoSensitiveData> {
		const passwordResetRequest = await prisma.passwordReset.findUnique({
			where: {
				id: passwordResetRequestId,
			},
		});

		if (!passwordResetRequest) {
			throw HttpError(404, 'Reset token not found');
		}

		const updatedUser = await prisma.user.update({
			where: {
				id: passwordResetRequest.userId,
			},
			data: {
				password: newPassword,
			},
		});

		await prisma.passwordReset.delete({
			where: passwordResetRequest,
		});

		return this.removeSensitiveInfo(updatedUser);
	}
}
