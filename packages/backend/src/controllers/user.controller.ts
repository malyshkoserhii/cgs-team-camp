import jwt from 'jsonwebtoken';
import { Response, NextFunction, Request } from 'express';
import passport from 'passport';

import UserService from '../services/user.service';
import { CreateUserRequest, LoginUserRequest } from '../types/requests.types';
import { ParsedQs } from 'qs';
import {
	CreateUserResponse,
	GetUserResponse,
	LoginUserResponse,
	Status,
} from '../types/responses.types';
import {
	comparePasswords,
	hashPassword,
} from '../routes/middlewares/auth.middlewares';
import { IUserSession } from '../types/user.type';
import { ERRORS, MESSAGES } from '../constants';
import {
	ActivateAccData,
	GetPasswordResetRequest,
	ResetPasswordData,
} from '../types/token.type';
import { prismaClient } from '@/modules/prisma';

export class UserController {
	constructor(private userService: UserService) {}

	async registerUser(
		req: CreateUserRequest,
		res: Response<CreateUserResponse>,
	): Promise<void> {
		const { email, name, password } = req.body;

		const user = await prismaClient.user.findUnique({
			where: { email },
		});

		if (user) {
			res.status(400).json({ error: ERRORS.USER.EXIST });
			return;
		}

		const response = await this.userService.create({
			email,
			name,
			password: await hashPassword(password),
		});

		res.send({ data: response, message: MESSAGES.USER.CREATED });
	}

	async loginUser(
		req: LoginUserRequest,
		res: Response<LoginUserResponse | { error: string }>,
		next: NextFunction,
	): Promise<void> {
		passport.authenticate('login', async (err: Error) => {
			const userReq = req.body;

			const user = await prismaClient.user.findUnique({
				where: { email: userReq.email },
			});

			if (err || !user) {
				res.status(400).json({ error: ERRORS.USER.NOT_EXIST });
				return;
			}

			if (err || user.active === false) {
				return res.status(400).json({ error: ERRORS.NOT_ACTIVE });
			}

			if (!(await comparePasswords(userReq.password, user.password))) {
				return res.status(400).json({ error: ERRORS.INCORRECT_PASS });
			}

			req.login(user, { session: false }, async (error) => {
				if (error) throw error;

				const body: IUserSession = {
					id: user.id,
					email: user.email,
					name: user.name,
				};
				const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

				return res.json({
					data: user,
					token,
					message: MESSAGES.USER.LOGINED,
				});
			});
		})(req, res, next);
	}

	async getUser(req: Request, res: Response<GetUserResponse>): Promise<void> {
		const user = req.user as IUserSession;

		res.send({ data: user });
	}

	async reqPasswordReset(
		req: GetPasswordResetRequest,
		res: Response<Status>,
	): Promise<void> {
		await this.userService.requestPasswordReset(req.body.email);

		res.send({ message: MESSAGES.USER.EMAIL_SENDED });
	}

	async resetPassword(
		req: Request<
			{ id: string },
			unknown,
			ResetPasswordData,
			ParsedQs,
			Record<string, unknown>
		>,
		res: Response<Status>,
	): Promise<void> {
		await this.userService.passwordReset({
			...req.body,
			userId: Number(req.body.userId),
		});

		res.send({ message: MESSAGES.USER.PASSWORD_CHANGED });
	}

	async activateAccount(
		req: Request<unknown, unknown, unknown, ActivateAccData>,
		res: Response<Status>,
	): Promise<void> {
		await this.userService.activateAcc({
			...req.query,
			id: Number(req.query.id),
		});

		res.redirect(`${process.env.CLIENT_URL}/auth/login`);
	}
}

const userController = new UserController(new UserService());
export default userController;
