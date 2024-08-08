import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { getAccessToken } from '~shared/helpers/getAccessToken';

export class HttpService {
	constructor(
		public baseUrl = process.env.SERVER_URL || '',
		public fetchingService = axios,
		public apiVersion = 'api',
	) {
		this.baseUrl = baseUrl;
		this.fetchingService = fetchingService;
		this.apiVersion = apiVersion;
	}

	private getFullApiUrl(url: string): string {
		return `${this.baseUrl}/${this.apiVersion}/${url}`;
	}

	private populateTokenToHeaderConfig(): Record<string, string> {
		const token = getAccessToken();
		return {
			Authorization: token ? `Bearer ${token}` : '',
		};
	}

	private extractUrlAndDataFromConfig(
		config: AxiosRequestConfig,
	): Omit<AxiosRequestConfig, 'url' | 'data'> {
		const { data: _data, url: _url, ...configWithoutDataAndUrl } = config;
		return configWithoutDataAndUrl;
	}

	public get<T>(
		config: AxiosRequestConfig,
		isAuth: boolean = true,
	): Promise<AxiosResponse<T>> {
		if (isAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			};
		}

		return this.fetchingService.get(
			this.getFullApiUrl(config.url),
			this.extractUrlAndDataFromConfig(config),
		);
	}

	public post<T>(
		config: AxiosRequestConfig,
		isAuth: boolean = true,
	): Promise<AxiosResponse<T>> {
		if (isAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			};
		}
		return this.fetchingService.post(
			this.getFullApiUrl(config.url),
			config.data,
			this.extractUrlAndDataFromConfig(config),
		);
	}

	public put<T>(
		config: AxiosRequestConfig,
		isAuth: boolean = true,
	): Promise<AxiosResponse<T>> {
		if (isAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			};
		}
		return this.fetchingService.put<T>(
			this.getFullApiUrl(config.url),
			config.data,
			this.extractUrlAndDataFromConfig(config),
		);
	}

	public delete<T>(
		config: AxiosRequestConfig,
		isAuth: boolean = true,
	): Promise<AxiosResponse<T>> {
		if (isAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			};
		}
		return this.fetchingService.delete<T>(
			this.getFullApiUrl(config.url),
			this.extractUrlAndDataFromConfig(config),
		);
	}

	public patch<T>(
		config: AxiosRequestConfig,
		isAuth: boolean = true,
	): Promise<AxiosResponse<T>> {
		if (isAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			};
		}
		return this.fetchingService.patch<T>(
			this.getFullApiUrl(config.url),
			config.data,
			this.extractUrlAndDataFromConfig(config),
		);
	}
}
