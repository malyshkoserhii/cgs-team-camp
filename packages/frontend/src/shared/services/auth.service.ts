import { STORAGE_KEYS } from '~shared/keys/router-keys';

import { ApiAuthEndpoints } from '~shared/keys/api-keys';
import {
	changePasswordType,
	LoginUserResponse,
	LoginUserType,
	RegisterUserType,
	UserNoSensetiveData,
} from '~shared/types/User.types';
import HttpService from './http.service';

class AuthService extends HttpService {
	constructor() {
		super();
	}
	async login(user: LoginUserType): Promise<LoginUserResponse> {
		const response = await this.post<LoginUserResponse>(
			{
				url: ApiAuthEndpoints.LOGIN,
				data: user,
			},
			false,
		);

		localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.access_token);

		return response.data;
	}

	async register(user: RegisterUserType): Promise<UserNoSensetiveData> {
		const response = await this.post<UserNoSensetiveData>(
			{
				url: ApiAuthEndpoints.REGISTER,
				data: user,
			},
			false,
		);

		return response.data;
	}
	async changePassword(data: changePasswordType): Promise<void> {
		await this.post<void>(
			{
				url: ApiAuthEndpoints.CHANGE_PASSWORD,
				data,
			},
			true,
		);
	}
	async updateUser(username: string): Promise<void> {
		await this.post<void>(
			{
				url: ApiAuthEndpoints.UPDATE_USER,
				data: { username },
			},
			true,
		);
	}
	async getCurrentUser(): Promise<UserNoSensetiveData> {
		const response = await this.get<UserNoSensetiveData>(
			{
				url: ApiAuthEndpoints.CURRENT_USER,
			},
			true,
		);

		return response.data;
	}
	async resetPassword(password: string, token: string): Promise<string> {
		const response = await this.post<string>(
			{
				url: ApiAuthEndpoints.RESET_PASSWORD(token),
				data: { password },
			},
			false,
		);

		return response.data;
	}
	async forgetPassword(email: string): Promise<string> {
		const response = await this.post<string>(
			{
				url: ApiAuthEndpoints.FORGET_PASSWORD,
				data: { email },
			},
			false,
		);

		return response.data;
	}
}

export default AuthService;
