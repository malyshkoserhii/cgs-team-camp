import { Request, Response } from 'express';

import { AuthService } from '@/services/auth.service';
import { MailService } from '@/services/mail.service';
import { tryCatchMiddleware } from '@/middlewares';
import { User } from '@prisma/client';

export class UserController {
	constructor(private authService: AuthService) {}

	async getCurrentUser(req: Request, res: Response): Promise<void> {
		const user = req.user as User;

		const userDataToSend = await this.authService.getUserDataToSend(user);

		res.status(200).json({ user: { ...userDataToSend } });
	}

	async updateUser(req: Request, res: Response): Promise<void> {
		const { id } = req.user as User;

		const updatedUser = await this.authService.updateUserById(id, {
			...req.body,
		});

		if (!!updatedUser) {
			const userDataToSend =
				await this.authService.getUserDataToSend(updatedUser);

			res.status(200).json(userDataToSend);
		}
	}
}

// export controllers
const mailService = new MailService();

const userController = new UserController(new AuthService(mailService));

export const ctrGetCurrentUser = tryCatchMiddleware(
	userController.getCurrentUser.bind(userController),
);
export const ctrUpdateUser = tryCatchMiddleware(
	userController.updateUser.bind(userController),
);
