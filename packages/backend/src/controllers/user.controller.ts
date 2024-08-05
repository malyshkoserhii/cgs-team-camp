import { Request, Response } from 'express';
import { Status } from '@/utils/const/status';
import { StatusCodes } from '@/utils/const/statusCodes';
import TryCatch from '@/utils/decorators/TryCatch.decorator';
import UserService from '../services/user.service';

@TryCatch
export class UserController {
	constructor(private userService: UserService) {
		this.register = this.register.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.refresh = this.refresh.bind(this);
		this.registerConfirmation = this.registerConfirmation.bind(this);
		this.requestPasswordReset = this.requestPasswordReset.bind(this);
		this.resetPassword = this.resetPassword.bind(this);
		this.currentUser = this.currentUser.bind(this);
		this.updateUser = this.updateUser.bind(this);
	}

	async register(req: Request, res: Response): Promise<void> {
		const data = await this.userService.register(req.body);
		res.status(StatusCodes.ok).json({
			code: StatusCodes.ok,
			status: Status.success,
			data,
		});
	}

	async registerConfirmation(req: Request, res: Response): Promise<void> {
		await this.userService.registerConfirmation(req.params.id);
		res.status(StatusCodes.ok).json({
			code: StatusCodes.ok,
			status: Status.success,
		});
	}

	async login(req: Request, res: Response): Promise<void> {
		const { user, tokens } = await this.userService.login(req.body);

		res.status(StatusCodes.ok).json({
			code: StatusCodes.ok,
			status: Status.success,
			data: { user, tokens },
		});
	}

	async logout(req: Request, res: Response): Promise<void> {
		await this.userService.logout(req.user.id);

		res.status(StatusCodes.noContent).json({
			code: StatusCodes.noContent,
		});
	}

	async refresh(req: Request, res: Response): Promise<void> {
		const tokens = await this.userService.refreshTokens(
			req.user.id,
			req.user.refreshToken!,
		);

		res.status(StatusCodes.ok).json({
			code: StatusCodes.ok,
			status: Status.success,
			data: { tokens },
		});
	}

	async requestPasswordReset(req: Request, res: Response): Promise<void> {
		const { email } = req.body;
		await this.userService.requestPasswordReset(email);

		res.status(StatusCodes.ok).json({
			code: StatusCodes.ok,
			status: Status.success,
			message: 'Password reset email sent',
		});
	}

	async resetPassword(req: Request, res: Response): Promise<void> {
		const { token, password } = req.body;
		await this.userService.resetPassword(token, password);

		res.status(StatusCodes.ok).json({
			code: StatusCodes.ok,
			status: Status.success,
			message: 'Password has been reset successfully',
		});
	}

	async currentUser(req: Request, res: Response): Promise<void> {
		const user = await this.userService.currentUser(req.user.id);

		res.status(StatusCodes.ok).json({
			code: StatusCodes.ok,
			status: Status.success,
			data: { user },
		});
	}

	async updateUser(req: Request, res: Response): Promise<void> {
		await this.userService.updateUser(req.user.id, req.body);

		res.status(StatusCodes.ok).json({
			code: StatusCodes.ok,
			status: Status.success,
		});
	}
}

export const userController = new UserController(new UserService());
