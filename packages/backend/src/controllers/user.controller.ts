import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import {
	generateTokens,
	verifyRefreshToken,
} from '../middleware/auth.middleware';

export const signup = async (req: Request, res: Response): Promise<void> => {
	try {
		await userService.createUser(req.body);
		res.status(201).json({
			message:
				'User created successfully. Please check your email to verify your account.',
		});
	} catch (error) {
		res.status(400).json({ message: (error as Error).message });
	}
};

export const login = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password } = req.body;
		const user = await userService.loginUser(email, password);
		const { accessToken, refreshToken } = generateTokens(user);
		await userService.saveRefreshToken(user.id, refreshToken);
		res.json({ accessToken, refreshToken });
	} catch (error) {
		res.status(401).json({ message: (error as Error).message });
	}
};

export const logout = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = (req.user as { id: number }).id;
		await userService.logoutUser(userId);
		res.json({ message: 'User logged out successfully' });
	} catch (error) {
		res.status(400).json({ message: (error as Error).message });
	}
};

export const refreshToken = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { refreshToken } = req.body;
		const userId = await verifyRefreshToken(refreshToken);
		const user = await userService.getUserById(userId);
		const tokens = generateTokens(user);
		await userService.saveRefreshToken(user.id, tokens.refreshToken);
		res.json(tokens);
	} catch (error) {
		res.status(401).json({ message: 'Invalid refresh token' });
	}
};

export const verifyAccount = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { token } = req.params;
		await userService.verifyUser(token);
		res.json({ message: 'Account verified successfully' });
	} catch (error) {
		res.status(400).json({ message: (error as Error).message });
	}
};

export const getProfile = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const userId = (req.user as { id: number }).id;
		const user = await userService.getUserById(userId);
		res.json(user);
	} catch (error) {
		res.status(400).json({ message: (error as Error).message });
	}
};

export const forgotPassword = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { email } = req.body;
		await userService.forgotPassword(email);
		res.json({ message: 'Password reset instructions sent to your email' });
	} catch (error) {
		res.status(400).json({ message: (error as Error).message });
	}
};

export const resetPassword = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { token, newPassword } = req.body;
		await userService.resetPassword(token, newPassword);
		res.json({ message: 'Password reset successfully' });
	} catch (error) {
		res.status(400).json({ message: (error as Error).message });
	}
};

export const changePassword = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const userId = (req.user as { id: number }).id;
		const { currentPassword, newPassword } = req.body;
		await userService.changePassword(userId, currentPassword, newPassword);
		res.json({ message: 'Password changed successfully' });
	} catch (error) {
		res.status(400).json({ message: (error as Error).message });
	}
};

export const editProfile = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const userId = (req.user as { id: number }).id;
		const { name } = req.body;
		await userService.editProfile(userId, name);
		res.json({ message: 'Profile updated successfully' });
	} catch (error) {
		res.status(400).json({ message: (error as Error).message });
	}
};
