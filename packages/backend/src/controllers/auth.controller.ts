import AuthService from '@/services/auth.service';
import MailService from '@/services/mail.service';
import tokenService from '@/services/token.service';
import { UserType } from '@/types/user.types';
import { Request, Response } from 'express';
export class AuthController {
	constructor(private authService: AuthService) {}

	async register(req: Request, res: Response): Promise<void> {
		const user = await this.authService.register(req.body);

		res.send(user);
	}
	async login(req: Request, res: Response): Promise<void> {
		const user = req.user as UserType;
		const access_token = tokenService.createToken(user.id);

		res.send({
			user: this.authService.removeSensitiveInfo(user),
			access_token,
		});
	}
	async verifyEmail(req: Request, res: Response): Promise<void> {
		const id = req.params.id;

		const updatedUser = await this.authService.verifyEmail(id);

		res.send(updatedUser);
	}
	async getCurrentUser(req: Request, res: Response): Promise<void> {
		const user = req.user as UserType;

		res.send(this.authService.removeSensitiveInfo(user));
	}
	async changePassword(req: Request, res: Response): Promise<void> {
		const user = req.user as UserType;

		const updatedUser = await this.authService.changePassword(
			user,
			req.body,
		);

		res.send(updatedUser);
	}
	async updateUser(req: Request, res: Response): Promise<void> {
		const user = req.user as UserType;
		const { username } = req.body;
		const updatedUser = await this.authService.updateUser(user, username);
		res.send(updatedUser);
	}
	async forgetPassword(req: Request, res: Response): Promise<void> {
		const { email } = req.body;
		const result = await this.authService.forgetPassword(email);

		res.send(result);
	}

	async resetPassword(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const { newPassword } = req.body;
		const result = await this.authService.resetPassword(id, newPassword);

		res.send(result);
	}
}
const authController = new AuthController(new AuthService(new MailService()));
export default authController;
