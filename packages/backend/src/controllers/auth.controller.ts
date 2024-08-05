import { NextFunction, Request, Response } from 'express';

import { AuthService } from '@/services/auth.service';
import { MailService } from '@/services/mail.service';
import { tryCatchMiddleware } from '@/middlewares';
import { ApiErrors } from '@/utils';

export class AuthController {
	constructor(
		private authService: AuthService,
		private mailService: MailService,
	) {}

	async register(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		// TODO check for isUserExist doubling with PrismaError
		const isUserExist = await this.authService.findUserByEmail(
			req.body.email,
		);

		if (isUserExist) {
			return next(ApiErrors.Conflict('Email in use'));
		}

		const { id, email } = await this.authService.createUser(req.body);
		const { token } = await this.authService.createActivationToken(id);

		await this.mailService.sendVerificationEmail(email, token);

		res.status(201).json({
			message:
				'For complete registration, please check your email and verify your account.',
		});
	}
}

const mailService = new MailService();
const authController = new AuthController(
	new AuthService(mailService),
	mailService,
);

export const ctrRegister = tryCatchMiddleware(
	authController.register.bind(authController),
);
