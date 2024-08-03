import AuthService from '@/services/auth.service';
import tokenService from '@/services/token.service';
import { UserType } from '@/types/user.types';
import { Request, Response } from 'express';
export class AuthController {
	constructor(private authService: AuthService) {}

	async register(req: Request, res: Response): Promise<void> {
		const user = await this.authService.register(req.body);
		const verificationToken = tokenService.createToken(user.id);
		res.send({ user, verificationToken });
	}
	async login(req: Request, res: Response): Promise<void> {
		const user = req.user as UserType;
		const access_token = tokenService.createToken(user.id);

		res.send({
			user: this.authService.removeSensitiveInfo(user),
			access_token,
		});
	}
}
const authController = new AuthController(new AuthService());
export default authController;
