import { AxiosResponse } from 'axios';

import { HttpService } from '~services/http.service';
import { User } from '~typings/user.types';
import { API_KEYS } from '~shared/keys';

export class AuthService extends HttpService {
	constructor() {
		super();
	}

	async registerUser(
		user: User,
	): Promise<AxiosResponse<{ message: string }>> {
		return this.post({ url: API_KEYS.REGISTER, data: user });
	}

	async loginUser(user: User): Promise<AxiosResponse<User>> {
		return this.post({ url: API_KEYS.LOGIN, data: user });
	}

	async forgetPassword(email: User): Promise<
		AxiosResponse<{
			message: string;
			user: User;
		}>
	> {
		return this.post({ url: API_KEYS.FORGOT_PSW, data: email });
	}

	async verifyEmail(token: string): Promise<
		AxiosResponse<{
			message: string;
			user: User;
		}>
	> {
		return this.post({ url: API_KEYS.VERIFY_EMAIL, data: { token } });
	}

	async resetPassword(
		password: string,
		token: string,
	): Promise<AxiosResponse<{ message: string }>> {
		return this.post({
			url: API_KEYS.RESET_PSW,
			data: { password, token },
		});
	}
}

export const authService = new AuthService();
