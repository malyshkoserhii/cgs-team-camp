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
}

const authController = new AuthController(new AuthService());
export default authController;
