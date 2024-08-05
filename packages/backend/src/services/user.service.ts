import { PrismaClient, User } from '@prisma/client';
import { sendVerificationEmail, sendPasswordResetEmail } from './email.service';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const prisma = new PrismaClient();

export const createUser = async (
	userData: Omit<
		User,
		| 'id'
		| 'isVerified'
		| 'refreshToken'
		| 'refreshTokenExpires'
		| 'verificationToken'
		| 'resetPasswordToken'
		| 'resetPasswordTokenExpires'
	>,
): Promise<User> => {
	const hashedPassword = await bcrypt.hash(userData.password, 10);
	const verificationToken = crypto.randomBytes(32).toString('hex');

	try {
		const user = await prisma.user.create({
			data: {
				...userData,
				password: hashedPassword,
				verificationToken,
			},
		});
		await sendVerificationEmail(user.email, verificationToken);

		return user;
	} catch (error) {
		console.error('Error creating user:', error);
		throw new Error('Failed to create user');
	}
};

export const verifyUser = async (token: string): Promise<User> => {
	const user = await prisma.user.findFirst({
		where: { verificationToken: token },
	});

	if (!user) {
		throw new Error('Invalid verification token');
	}

	return prisma.user.update({
		where: { id: user.id },
		data: { isVerified: true, verificationToken: null },
	});
};

export const loginUser = async (
	email: string,
	password: string,
): Promise<User> => {
	const user = await prisma.user.findUnique({ where: { email } });

	if (!user || !user.isVerified) {
		throw new Error('Invalid credentials or unverified account');
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		throw new Error('Invalid credentials');
	}

	return user;
};

export const logoutUser = async (userId: number): Promise<void> => {
	await prisma.user.update({
		where: { id: userId },
		data: { refreshToken: null, refreshTokenExpires: null },
	});
};

export const saveRefreshToken = async (
	userId: number,
	refreshToken: string,
): Promise<void> => {
	const refreshTokenExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
	await prisma.user.update({
		where: { id: userId },
		data: { refreshToken, refreshTokenExpires },
	});
};

export const getUserById = async (userId: number): Promise<User> => {
	const user = await prisma.user.findUnique({ where: { id: userId } });
	if (!user) {
		throw new Error('User not found');
	}
	return user;
};

export const forgotPassword = async (email: string): Promise<void> => {
	const user = await prisma.user.findUnique({ where: { email } });

	if (!user) {
		throw new Error('User not found');
	}

	const resetToken = crypto.randomBytes(32).toString('hex');
	const resetTokenExpires = new Date(Date.now() + 3600000);

	await prisma.user.update({
		where: { id: user.id },
		data: {
			resetPasswordToken: resetToken,
			resetPasswordTokenExpires: resetTokenExpires,
		},
	});

	await sendPasswordResetEmail(email, resetToken);
};

export const resetPassword = async (
	token: string,
	newPassword: string,
): Promise<User> => {
	const user = await prisma.user.findFirst({
		where: {
			resetPasswordToken: token,
			resetPasswordTokenExpires: { gt: new Date() },
		},
	});

	if (!user) {
		throw new Error('Invalid or expired reset token');
	}

	const hashedNewPassword = await bcrypt.hash(newPassword, 10);

	return prisma.user.update({
		where: { id: user.id },
		data: {
			password: hashedNewPassword,
			resetPasswordToken: null,
			resetPasswordTokenExpires: null,
		},
	});
};

export const changePassword = async (
	userId: number,
	currentPassword: string,
	newPassword: string,
): Promise<User> => {
	const user = await prisma.user.findUnique({ where: { id: userId } });

	if (!user) {
		throw new Error('User not found');
	}

	const isPasswordValid = await bcrypt.compare(
		currentPassword,
		user.password,
	);

	if (!isPasswordValid) {
		throw new Error('Invalid current password');
	}

	const hashedNewPassword = await bcrypt.hash(newPassword, 10);

	return prisma.user.update({
		where: { id: userId },
		data: { password: hashedNewPassword },
	});
};

export const editProfile = async (
	userId: number,
	name: string,
): Promise<User> => {
	return prisma.user.update({
		where: { id: userId },
		data: { name: name },
	});
};
