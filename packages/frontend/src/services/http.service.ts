import axios, { AxiosResponse, AxiosError, AxiosInstance } from 'axios';
import { apiRoutes } from '~/api/api.routes';

import { errorHandler } from '~/utils/errorHandler';
import { clearTokens, getToken, setToken } from '~/utils/tokenHandlers';
import { ROUTER_KEYS, STORAGE_KEYS } from '~shared/keys';

import type { ResponseData } from '~typings/api';

export class HttpService {
	baseUrl: string;
	private axiosInstance: AxiosInstance;

	constructor(baseUrl = process.env.SERVER_URL) {
		this.baseUrl = baseUrl;
		this.axiosInstance = axios.create({
			baseURL: this.baseUrl,
		});

		this.setupInterceptors();
	}

	private setupInterceptors() {
		this.axiosInstance.interceptors.response.use(
			(response) => response,
			async (error) => {
				const originalRequest = error.config;

				if (error.response?.status === 401 && !originalRequest._retry) {
					originalRequest._retry = true;
					try {
						const refreshToken = getToken(
							STORAGE_KEYS.REFRESH_TOKEN,
						);

						if (!refreshToken) {
							clearTokens();
							window.location.href = ROUTER_KEYS.LOGIN;
							return Promise.reject(error);
						}

						const response = await this.axiosInstance.post(
							`${apiRoutes.user}/${apiRoutes.refreshToken}`,
							{ refreshToken: refreshToken },
						);

						const {
							accessToken: newAccessToken,
							refreshToken: newRefreshToken,
						} = response.data.tokens;

						if (newAccessToken && newRefreshToken) {
							setToken(STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);
							setToken(
								STORAGE_KEYS.REFRESH_TOKEN,
								newRefreshToken,
							);

							originalRequest.headers['Authorization'] =
								`Bearer ${newAccessToken}`;

							return this.axiosInstance(originalRequest);
						}
						return;
					} catch (refreshError) {
						clearTokens();
						window.location.href = ROUTER_KEYS.LOGIN;
						return Promise.reject(refreshError);
					}
				}

				return Promise.reject(error);
			},
		);
	}

	private getFullApiUrl(apiRoute: string): string {
		return `${this.baseUrl}/${apiRoute}`;
	}

	private populateTokenToHeaderConfig(): { Authorization: string } {
		return {
			Authorization: `Bearer ${getToken(STORAGE_KEYS.ACCESS_TOKEN)}`,
		};
	}

	private handleRequest<T>(request: Promise<AxiosResponse<T>>): Promise<T> {
		return request
			.then((response) => response.data)
			.catch((error: AxiosError<ResponseData>) => {
				throw errorHandler(error);
			});
	}

	get(
		config: { apiRoute: string; headers?: Record<string, string> },
		withAuth = true,
	) {
		if (withAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			};
		}
		return this.handleRequest(
			this.axiosInstance.get(this.getFullApiUrl(config.apiRoute), {
				headers: config.headers,
			}),
		);
	}

	post(
		config: {
			apiRoute: string;
			data?: Record<string, unknown>;
			headers?: Record<string, string>;
		},
		withAuth = true,
	) {
		if (withAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			};
		}
		return this.handleRequest(
			this.axiosInstance.post(
				this.getFullApiUrl(config.apiRoute),
				config.data,
				{
					headers: config.headers,
				},
			),
		);
	}

	put(
		config: {
			apiRoute: string;
			data?: Record<string, unknown>;
			headers?: Record<string, string>;
		},
		withAuth = true,
	) {
		if (withAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			};
		}
		return this.handleRequest(
			this.axiosInstance.put(
				this.getFullApiUrl(config.apiRoute),
				config.data,
				{
					headers: config.headers,
				},
			),
		);
	}

	delete(
		config: {
			apiRoute: string;
			headers?: Record<string, string>;
		},
		withAuth = true,
	) {
		if (withAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			};
		}
		return this.handleRequest(
			this.axiosInstance.delete(this.getFullApiUrl(config.apiRoute), {
				headers: config.headers,
			}),
		);
	}
}
