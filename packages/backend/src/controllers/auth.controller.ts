import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/user.service';
import { User } from '@prisma/client';

export class AuthController {
	constructor(private authService: AuthService) {}

	public async register(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const { email, password, name } = req.body;
		try {
			const user: User = await this.authService.registerUser(
				email,
				password,
				name,
			);
			res.status(201).json(user);
		} catch (error) {
			next(error);
		}
	}

	public async activate(
		req: Request,
		res: Response,
		// next: NextFunction,
	): Promise<void> {
		const { activationToken } = req.params;
		try {
			const user = await this.authService.activateUser(activationToken);
			res.status(200).json({
				message: 'Account activated successfully',
				user,
			});
		} catch (error) {
			console.error('Error activating user:', error);

			let errorMessage = 'An unknown error occurred';
			if (error instanceof Error) {
				errorMessage = error.message;
			}

			res.status(400).json({ error: errorMessage });
		}
	}

	public async login(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const { email, password } = req.body;
		try {
			const user: User = await this.authService.loginUser(
				email,
				password,
			);
			res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	}

	public async logout(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const userId = (req.user as { id: number }).id;
			await this.authService.logoutUser(userId);
			res.sendStatus(200);
		} catch (error) {
			next(error);
		}
	}

	// public async me(
	// 	req: Request,
	// 	res: Response,
	// 	next: NextFunction,
	// ): Promise<void> {
	// 	try {
	// 		const userId = (req.user as { id: number }).id;
	// 		const user: User = await this.authService.getUserById(userId);
	// 		res.status(200).json(user);
	// 	} catch (error) {
	// 		next(error);
	// 	}
	// }

	public async refreshToken(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const { refreshToken } = req.body;
		try {
			const tokens = await this.authService.refreshToken(refreshToken);
			res.status(200).json(tokens);
		} catch (error) {
			next(error);
		}
	}

	// public async forgotPassword(
	// 	req: Request,
	// 	res: Response,
	// 	next: NextFunction,
	// ): Promise<void> {
	// 	// Implement forgot password logic
	// }

	// public async resetPassword(
	// 	req: Request,
	// 	res: Response,
	// 	next: NextFunction,
	// ): Promise<void> {
	// 	// Implement reset password logic
	// }

	// public async changePassword(
	// 	req: Request,
	// 	res: Response,
	// 	next: NextFunction,
	// ): Promise<void> {
	// 	// Implement change password logic
	// }
}

const authController = new AuthController(new AuthService());
export default authController;
