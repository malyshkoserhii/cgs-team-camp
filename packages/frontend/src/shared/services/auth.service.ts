import { AxiosResponse } from 'axios';
import HttpServices from './http';
import {
	ChangePasswordData,
	IRegisterData,
	IUser,
	LoginData,
} from '~shared/interfaces/user.interface';

class AuthService extends HttpServices {
	constructor() {
		super();
	}

	async register(data: IRegisterData): Promise<AxiosResponse<IUser>> {
		return this.post({ url: 'register', data }, false);
	}

	async login(data: LoginData): Promise<AxiosResponse<IUser>> {
		return this.post({ url: 'login', data }, false);

		// set token to localstorage
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

	async fogetPAssword(email: string): Promise<AxiosResponse> {
		return this.post({ url: 'foget-password', data: email });
	}

	async resetPassword(resetToken: string): Promise<AxiosResponse<IUser>> {
		return this.post({ url: `reset-password/${resetToken}` });
	}
}

export default AuthService;
