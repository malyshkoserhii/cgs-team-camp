import { NextFunction, Request, Response } from 'express';

import { AuthService } from '@/services/auth.service';
import { MailService } from '@/services/mail.service';
import { tryCatchMiddleware } from '@/middlewares';
import { ApiErrors } from '@/utils';
import { User } from '@prisma/client';
import { TokenService } from '@/services/token.service';

export class AuthController {
	constructor(
		private authService: AuthService,
		private mailService: MailService,
		private tokenService: TokenService,
	) {}

	async register(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
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

	async login(req: Request, res: Response): Promise<void> {
		const user = req.user as User;

		const accessToken = this.tokenService.createToken(user.id);
		const userDataToSend = await this.authService.getUserDataToSend(user);

		res.status(200).json({ user: { ...userDataToSend, accessToken } });
	}

	async verifyEmail(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const token = req.params.token;

		const activationToken =
			await this.authService.verifyActivationToken(token);

		if (!activationToken) {
			return next(
				ApiErrors.NotFound('User not found. Try register again later'),
			);
		}

		const user = await this.authService.findUserById(
			activationToken.userId,
		);

		if (user?.isEmailVerified) {
			return next(ApiErrors.Conflict('Email already verified'));
		}

		const verifiedUser = await this.authService.updateUserById(
			activationToken.userId,
			{ isEmailVerified: true },
		);

		if (verifiedUser?.isEmailVerified) {
			res.status(200).json({ message: 'Email verified successfully' });
		}
	}
}

// export controllers
const mailService = new MailService();
const tokenService = new TokenService();

const authController = new AuthController(
	new AuthService(mailService),
	mailService,
	tokenService,
);

export const ctrRegister = tryCatchMiddleware(
	authController.register.bind(authController),
);

export const ctrLogin = tryCatchMiddleware(
	authController.login.bind(authController),
);
export const ctrVerifyEmail = tryCatchMiddleware(
	authController.verifyEmail.bind(authController),
);
