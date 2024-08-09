import axios, { AxiosResponse } from 'axios';
import HttpServices from './http';
import {
	ChangePasswordData,
	fogetPassword,
	IRegisterData,
	IUser,
	LoginData,
	LoginResponse,
} from '~shared/interfaces/user.interface';
import { STORAGE_KEYS } from '~shared/keys';

class AuthService extends HttpServices {
	constructor() {
		super(process.env.SERVER_URL, axios, 'user');
	}

	async register(data: IRegisterData): Promise<AxiosResponse<IUser>> {
		return this.post({ url: 'register', data }, false);
	}

	async login(data: LoginData): Promise<LoginResponse> {
		const response = await this.post<AxiosResponse<LoginResponse>>(
			{ url: 'login', data },
			false,
		);

		localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token);

		return response.data;
	}

	async verifyEmail(verifyToken: string): Promise<AxiosResponse<IUser>> {
		return this.get({ url: `verify/${verifyToken}` });
	}

	async getCurrentUser(): Promise<AxiosResponse<IUser>> {
		return this.get({ url: 'current' }, true);
	}

	async changePassword(
		data: ChangePasswordData,
	): Promise<AxiosResponse<IUser>> {
		return this.putch({ url: 'change-password', data }, true);
	}

	async fogetPAssword(email: fogetPassword): Promise<AxiosResponse> {
		return this.post({ url: 'foget-password', data: email });
	}

	async resetPassword(
		resetToken: string,
		newPassword: string,
	): Promise<AxiosResponse<IUser>> {
		return this.post({
			url: `reset-password/${resetToken}`,
			data: newPassword,
		});
	}
}

export default AuthService;
