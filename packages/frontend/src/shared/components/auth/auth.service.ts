import { BACKEND_KEYS, STORAGE_KEYS } from '~shared/keys';
import HttpService from '../../../api/http.service';
import {
	AuthData,
	LoginData,
	ReqResetPasswordData,
	ResetPasswordData,
} from '../../types/auth/auth.types';
import { IUser } from '../../types/user/user.types';

class AuthService extends HttpService {
	async register(body: AuthData): Promise<AuthData> {
		const { data } = await this.put<AuthData>({
			method: 'post',
			url: BACKEND_KEYS.AUTH.REG,
			data: body,
		});

		return data;
	}

	async getUser(): Promise<IUser> {
		const { data } = await this.get<IUser>({
			url: BACKEND_KEYS.AUTH.USER,
		});

		return data;
	}

	async login(body: AuthData): Promise<LoginData> {
		const { data: user, token } = await this.put<LoginData>({
			method: 'post',
			url: BACKEND_KEYS.AUTH.LOGIN,
			data: body,
			withCredentials: true,
		});

		if (token) {
			localStorage.setItem(STORAGE_KEYS.TOKEN, `Bearer ${token}`);
		}

		return user;
	}

	async reqResetPassword(body: ReqResetPasswordData): Promise<void> {
		await this.put({
			method: 'post',
			url: BACKEND_KEYS.AUTH.REQ_RESET_PASS,
			data: body,
		});
	}

	async resetPassword(body: ResetPasswordData): Promise<void> {
		await this.put({
			method: 'post',
			url: BACKEND_KEYS.AUTH.RESET_PASS,
			data: body,
		});
	}
}

export default new AuthService();
