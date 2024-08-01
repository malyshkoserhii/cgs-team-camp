import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { STORAGE_KEYS } from '~shared/keys/router-keys';

class HttpService {
	private baseUrl: string;
	private fetchingService: AxiosInstance;
	private apiVersion: string;

	constructor(
		baseUrl: string = process.env.BASE_URL || '',
		fetchingService = axios,
		apiVersion: string = 'api',
	) {
		this.baseUrl = baseUrl;
		this.fetchingService = fetchingService;
		this.apiVersion = apiVersion;
	}

	private getFullApiUrl(url: string): string {
		return `${this.baseUrl}/${this.apiVersion}/${url}`;
	}

	private populateTokenToHeaderConfig(): Record<string, string> {
		return {
			Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.TOKEN)}`,
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
		Auth: boolean = true,
	): Promise<AxiosResponse<T>> {
		if (Auth) {
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
		Auth: boolean = true,
	): Promise<AxiosResponse<T>> {
		if (Auth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			};
		}

		return this.fetchingService.post<T>(
			this.getFullApiUrl(config.url as string),
			config.data,
			this.extractUrlAndDataFromConfig(config),
		);
	}

	public put<T>(
		config: AxiosRequestConfig,
		Auth: boolean = true,
	): Promise<AxiosResponse<T>> {
		if (Auth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			};
		}
		return this.fetchingService.put<T>(
			this.getFullApiUrl(config.url as string),
			config.data,
			this.extractUrlAndDataFromConfig(config),
		);
	}

	public delete<T>(
		config: AxiosRequestConfig,
		Auth: boolean = true,
	): Promise<AxiosResponse<T>> {
		if (Auth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			};
		}
		return this.fetchingService.delete<T>(
			this.getFullApiUrl(config.url as string),
			this.extractUrlAndDataFromConfig(config),
		);
	}
}

export default HttpService;
