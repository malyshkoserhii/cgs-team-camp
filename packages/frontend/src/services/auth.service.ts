import { HttpService } from './http.service';
import { apiRoutes } from '~/api/api.routes';
import { STORAGE_KEYS } from '~/shared/keys';
import { clearTokens, getToken, setToken } from '~/utils/tokenHandlers';

import type {
	User,
	LoginInput,
	RegisterInput,
	UpdateUserInput,
} from '~typings/user';

export class AuthService extends HttpService {
	private readonly apiRoute = apiRoutes.user;

	constructor(baseUrl?: string) {
		super(baseUrl);
	}

	async login(credentials: LoginInput) {
		const response = await this.post(
			{
				apiRoute: `${this.apiRoute}/${apiRoutes.login}`,
				data: credentials,
			},
			false,
		);
		setToken(STORAGE_KEYS.ACCESS_TOKEN, response.tokens.accessToken);
		setToken(STORAGE_KEYS.REFRESH_TOKEN, response.tokens.refreshToken);
		return response;
	}

	async getUserProfile(id: string): Promise<User> {
		return this.get({ apiRoute: `${this.apiRoute}/${id}` });
	}

	async register(userData: RegisterInput) {
		return this.post(
			{
				apiRoute: `${this.apiRoute}/${apiRoutes.register}`,
				data: userData,
			},
			false,
		);
	}

	async logout() {
		const refreshToken = getToken(STORAGE_KEYS.REFRESH_TOKEN);
		try {
			const response = await this.post(
				{
					apiRoute: `${this.apiRoute}/${apiRoutes.logout}`,
					data: { refreshToken },
				},
				true,
			);
			return response;
		} finally {
			clearTokens();
		}
	}

	async forgotPassword(email: string) {
		return this.post(
			{
				apiRoute: `${this.apiRoute}/${apiRoutes.forgotPassword}`,
				data: { email },
			},
			false,
		);
	}

	async resetPassword(resetToken: string, newPassword: string) {
		return this.post(
			{
				apiRoute: `${this.apiRoute}/${apiRoutes.resetPassword}`,
				data: { resetToken, newPassword },
			},
			false,
		);
	}

	async changePassword(oldPassword: string, newPassword: string) {
		return this.post({
			apiRoute: `${this.apiRoute}/${apiRoutes.changePassword}`,
			data: { oldPassword, newPassword },
		});
	}

	async updateUser(newUserData: UpdateUserInput) {
		const { id, name } = newUserData;
		const response = await this.put({
			apiRoute: `${this.apiRoute}/${id}`,
			data: { name },
		});
		return response;
	}

	async verifyEmail(token: string): Promise<void> {
		return this.get(
			{
				apiRoute: `${this.apiRoute}/${apiRoutes.veriftEmail}/${token}`,
			},
			false,
		);
	}

	async resendVerificationEmail(email: string): Promise<void> {
		return this.post(
			{
				apiRoute: `${this.apiRoute}/${apiRoutes.resendVerification}`,
				data: { email },
			},
			false,
		);
	}

	protected async refreshToken(refreshToken: string) {
		const response = await this.post(
			{
				apiRoute: `${this.apiRoute}/${apiRoutes.refreshToken}`,
				data: { refreshToken },
			},
			false,
		);
		setToken(STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
		setToken(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
		return response;
	}

	isAuthenticated() {
		return !!getToken(STORAGE_KEYS.ACCESS_TOKEN);
	}
}
