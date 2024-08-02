import { AxiosResponse } from 'axios';
import { ApiPath, UserApiPath } from '~shared/const/apiPath.const';
import { TokenI, UserI } from '~shared/interfaces/user.interface copy';
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
				data: data,
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
				data: data,
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

	async refresh(refreshToken: string): Promise<AxiosResponse<TokenI>> {
		return await this.post({
			config: {
				url: `${ApiPath.USER}${UserApiPath.REFRESH}`,
				data: { refreshToken },
			},
			withAuth: true,
		});
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
}

const userService = new UserService();
export default userService;
