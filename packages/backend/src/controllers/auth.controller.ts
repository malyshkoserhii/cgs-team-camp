import AuthService from '@/services/auth.service';
import { responseCodes } from '@/const/responseCodes';
import { responseMessages } from '@/const/responseMessages';
import {
	sendResetPasswordEmail,
	sendVerificationEmail,
} from '@/helpers/email.helper';

import type { Request, Response, NextFunction } from 'express';
import type { User } from '@prisma/client';

export class AuthController {
	constructor(private authService: AuthService) {}

	async getUserById(
		req: Request & { user?: User },
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const { id } = req.params;
		const requestingUserId = req.user!.id;

		try {
			if (id !== requestingUserId) {
				res.status(responseCodes.FORBIDDEN).json({
					message: responseMessages.FORBIDDEN,
				});
				return;
			}

			const user = await this.authService.getUserById(id);
			if (user) {
				res.json(user);
			} else {
				res.status(responseCodes.NOT_FOUND).json({
					message: responseMessages.NOT_FOUND,
				});
			}
		} catch (e) {
			next(e);
		}
	}

	async register(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const { email, password, name } = req.body;
		try {
			const user = await this.authService.registerUser(
				email,
				password,
				name,
			);
			await sendVerificationEmail(email, user.verificationToken!);
			res.status(responseCodes.CREATED).json({
				message: responseMessages.CREATED,
				userId: user.id,
			});
		} catch (e) {
			next(e);
		}
	}

	async verifyEmail(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const { token } = req.params;
		try {
			const success = await this.authService.verifyEmail(token);
			if (success) {
				res.json({ message: responseMessages.EMAIL_VERIFIED });
			} else {
				res.status(responseCodes.BAD_REQUEST).json({
					message: responseMessages.INVALID_VERIFICATION_TOKEN,
				});
			}
		} catch (e) {
			next(e);
		}
	}

	async resendVerificationEmail(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const { email } = req.body;
		try {
			const newToken =
				await this.authService.resendVerificationEmail(email);
			if (newToken) {
				await sendVerificationEmail(email, newToken);
				res.json({ message: responseMessages.VERIFICATION_EMAIL_SENT });
			} else {
				res.status(responseCodes.BAD_REQUEST).json({
					message: responseMessages.EMAIL_ALREADY_VERIFIED,
				});
			}
		} catch (e) {
			next(e);
		}
	}

	async login(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const { email, password } = req.body;
		try {
			const result = await this.authService.loginUser(email, password);
			if (!result) {
				res.status(responseCodes.UNAUTHORIZED).json({
					message: responseMessages.INVALID_CREDENTIALS,
				});
				return;
			}
			res.json({
				message: responseMessages.SUCCESS,
				userId: result.user.id,
				tokens: result.tokens,
			});
		} catch (e) {
			next(e);
		}
	}

	async logout(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const { refreshToken } = req.body;
		try {
			await this.authService.logoutUser(refreshToken);
			res.json({ message: responseMessages.SUCCESS });
		} catch (e) {
			next(e);
		}
	}

	async changePassword(
		req: Request & { user?: User },
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const { oldPassword, newPassword } = req.body;
		const requestingUserId = req.user!.id;

		try {
			const success = await this.authService.changePassword(
				requestingUserId,
				oldPassword,
				newPassword,
			);
			if (success) {
				res.json({ message: responseMessages.SUCCESS });
			} else {
				res.status(responseCodes.BAD_REQUEST).json({
					message: responseMessages.PASSWORD_RESET_FAIL,
				});
			}
		} catch (e) {
			next(e);
		}
	}

	async forgotPassword(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const { email } = req.body;
		try {
			const resetToken = await this.authService.forgotPassword(email);
			if (resetToken) {
				await sendResetPasswordEmail(email, resetToken);
				res.json({ message: responseMessages.RESET_EMAIL_SENT });
			} else {
				res.status(responseCodes.NOT_FOUND).json({
					message: responseMessages.NOT_FOUND,
				});
			}
		} catch (e) {
			next(e);
		}
	}

	async resetPassword(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const { resetToken, newPassword } = req.body;
		try {
			const success = await this.authService.resetPassword(
				resetToken,
				newPassword,
			);
			if (success) {
				res.json({ message: responseMessages.SUCCESS });
			} else {
				res.status(responseCodes.BAD_REQUEST).json({
					message: responseMessages.INVALID_RESET_TOKEN,
				});
			}
		} catch (e) {
			next(e);
		}
	}

	async refreshToken(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const { refreshToken } = req.body;
		try {
			const newTokens =
				await this.authService.refreshTokens(refreshToken);
			if (!newTokens) {
				res.status(responseCodes.UNAUTHORIZED).json({
					message: responseMessages.INVALID_RESET_TOKEN,
				});
				return;
			}
			res.json({
				message: responseMessages.SUCCESS,
				tokens: newTokens,
			});
		} catch (e) {
			next(e);
		}
	}
}

const authController = new AuthController(new AuthService());
export default authController;
