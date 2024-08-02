import { AxiosResponse } from 'axios';
import { $refreshApi } from '~shared/api/refreshApi.instance';
import { ApiPath, UserApiPath } from '~shared/const/apiPath.const';
import { STORAGE_KEYS } from '~shared/const/keys.const';
import { setTokens } from '~shared/helpers/setTokens';
import { TokenI, UserI } from '~shared/interfaces/user.interface copy';
import { storageApi } from '../storage/storage';
import HttpService from './http.service';

class UserService extends HttpService {
	constructor() {
		super();
	}

	async register(data: {
		email: string;
		password: string;
		name: string;
	}): Promise<AxiosResponse<void>> {
		return await this.post({
			config: {
				url: `${ApiPath.USER}${UserApiPath.REGISTER}`,
				data,
			},
			withAuth: false,
		});
	}

	async login(data: {
		email: string;
		password: string;
	}): Promise<AxiosResponse<{ user: UserI; tokens: TokenI }>> {
		return await this.post({
			config: {
				url: `${ApiPath.USER}${UserApiPath.LOGIN}`,
				data,
			},
			withAuth: false,
		});
	}

	async logout(): Promise<AxiosResponse<void>> {
		return await this.post({
			config: {
				url: `${ApiPath.USER}${UserApiPath.LOGOUT}`,
			},
			withAuth: true,
		});
	}

	async refresh(): Promise<AxiosResponse<{ tokens: TokenI }>> {
		const refreshToken = storageApi.get(STORAGE_KEYS.TOKEN_REFRESH);
		const response = await $refreshApi.post(
			`${ApiPath.USER}${UserApiPath.REFRESH}`,
			null,
			{
				headers: {
					Authorization: `Bearer ${refreshToken}`,
				},
			},
		);
		setTokens(response.data.tokens);

		return response;
	}

	async requestPasswordReset(email: string): Promise<AxiosResponse<void>> {
		return await this.post({
			config: {
				url: `${ApiPath.USER}${UserApiPath.PASSWORD_RESET_REQUEST}`,
				data: { email },
			},
			withAuth: false,
		});
	}

	async resetPassword(
		token: string,
		password: string,
	): Promise<AxiosResponse<void>> {
		return await this.post({
			config: {
				url: `${ApiPath.USER}${UserApiPath.PASSWORD_RESET}`,
				data: { token, password },
			},
			withAuth: false,
		});
	}

	async registerConfirmation(id: string): Promise<AxiosResponse<void>> {
		return await this.get({
			config: {
				url: `${ApiPath.USER}${UserApiPath.ACTIVATE}/${id}`,
			},
			withAuth: false,
		});
	}

	async currentUser(): Promise<AxiosResponse<{ user: UserI }>> {
		return await this.get({
			config: {
				url: `${ApiPath.USER}${UserApiPath.CURRENT}`,
			},
			withAuth: true,
		});
	}
}

const userService = new UserService();
export default userService;
