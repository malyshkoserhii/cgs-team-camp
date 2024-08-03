import AuthService from '@/services/auth.service';
import { Request, Response } from 'express';
export class AuthController {
	constructor(private authService: AuthService) {}

	async register(req: Request, res: Response): Promise<void> {
		const user = await this.authService.register(req.body);

		res.send(user);
	}
}
const authController = new AuthController(new AuthService());
export default authController;
