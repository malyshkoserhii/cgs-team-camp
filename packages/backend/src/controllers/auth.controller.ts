import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/user.service';
import { User } from '@prisma/client';
import UserService from '../services/user.service';

export class AuthController {
	private userService: UserService;
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

	public async activate(req: Request, res: Response): Promise<void> {
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
			const { user, accessToken, refreshToken } =
				await this.authService.loginUser(email, password);
			res.status(200).json({ user, accessToken, refreshToken });
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
			await this.userService.logoutUser(userId);
			res.sendStatus(200);
		} catch (error) {
			next(error);
		}
	}

	public async refreshToken(req: Request, res: Response): Promise<void> {
		const { refreshToken } = req.body;
		try {
			const tokens = await this.authService.refreshToken(refreshToken);
			res.status(200).json(tokens);
		} catch (error) {
			res.status(401).json({
				message: 'Failed to refresh token: ' + (error as Error).message,
			});
		}
	}

	public async forgotPassword(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { email } = req.body;
			await this.authService.forgotPassword(email);
			res.sendStatus(200);
		} catch (error) {
			next(error);
		}
	}

	public async resetPassword(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { resetToken, newPassword } = req.body;
			await this.authService.resetPassword(resetToken, newPassword);
			res.sendStatus(200);
		} catch (error) {
			next(error);
		}
	}

	public async changePassword(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { oldPassword, newPassword } = req.body;
			const userId = (req.user as { id: number }).id;
			await this.authService.changePassword(
				userId,
				oldPassword,
				newPassword,
			);
			res.sendStatus(200);
		} catch (error) {
			next(error);
		}
	}

	public async getProfile(req: Request, res: Response): Promise<void> {
		try {
			const userId = (req.user as { id: number }).id;
			const user = await this.userService.getUserById(userId);
			res.json(user);
		} catch (error) {
			console.error('Error in getProfile:', error);
			res.status(500).json({ message: 'Internal server error' });
		}
	}
}

const authController = new AuthController(new AuthService());
export default authController;
