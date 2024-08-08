import { Request, Response } from 'express';
import userService from '@/services/user.service';
import {
	sendResetPasswordEmail,
	sendVerificationEmail,
} from '@/services/email.service';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import * as crypto from 'node:crypto';
const prisma = new PrismaClient();
const generateToken = (id: number): string => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

class UserController {
	async register(req: Request, res: Response): Promise<void> {
		const { username, email, password } = req.body;
		const user = await userService.register(username, email, password);
		const token = generateToken(user.id);
		await sendVerificationEmail(user.email, token);

		res.status(201).json(user);
	}

	async login(req: Request, res: Response): Promise<void> {
		const { username, password } = req.body;
		const { token, user } = await userService.login(username, password);
		res.json({ token, user });
	}

	async changePassword(req: Request, res: Response): Promise<void> {
		const { newPassword } = req.body;
		const userId = req.user.id;
		await userService.changePassword(userId, newPassword);
		res.sendStatus(204);
	}
	async forgotPassword(req: Request, res: Response): Promise<void> {
		const { email } = req.body;
		const user = await prisma.user.findUnique({ where: { email } });

		const token = crypto.randomBytes(20).toString('hex');
		await prisma.user.update({
			where: { email },
			data: {
				resetPasswordToken: token,
				resetPasswordExpires: new Date(Date.now() + 3600000), // 1 hour
			},
		});

		await sendResetPasswordEmail(user!.email, token);

		res.status(200).json({ message: 'Reset password email sent' });
	}
	async requestPasswordReset(req: Request, res: Response): Promise<void> {
		const { email } = req.body;

		try {
			await userService.generateResetPasswordToken(email);
			res.status(200).json({ message: 'Reset password email sent' });
		} catch (error) {
			res.status(500).json({
				error: 'Failed to send reset password email',
			});
		}
	}

	async resetUserPassword(req: Request, res: Response): Promise<void> {
		const { token, newPassword } = req.body;

		await userService.resetPassword(token, newPassword);
		res.status(200).json({ message: 'Password reset successful' });
	}
}

const userController = new UserController();
export default userController;
