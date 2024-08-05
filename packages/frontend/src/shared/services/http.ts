import axios from 'axios';
import { STORAGE_KEYS } from '~shared/keys';

interface IHttpServicesConfig {
	url: string;
	data?: unknown;
	headers?: Record<string, string>;
	params?: Record<string, unknown>;
}

class HttpServices {
	private baseUrl: string;
	private fetchingService: typeof axios;
	private apiVersion: string;

	constructor(
		baseUrl = process.env.SERVER_URL,
		fetchingService = axios,
		apiVersion = 'todos',
	) {
		this.baseUrl = baseUrl;
		this.fetchingService = fetchingService;
		this.apiVersion = apiVersion;
	}

	private getFullApiUrl(url: string): string {
		return `${this.baseUrl}/${this.apiVersion}/${url}`;
	}

	private populeteTockenToHeaderConfig(): { Authorization: string | null } {
		return {
			Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.TOKEN)}`,
		};
	}

	private extractUrlAndDataFromConfig(
		congig: IHttpServicesConfig,
	): Omit<IHttpServicesConfig, 'url' | 'data'> {
		const { url: _url, data: _data, ...configWithoutDataAndUrl } = congig;
		return configWithoutDataAndUrl;
	}

	get<T>(config: IHttpServicesConfig, withAuth: boolean = true): Promise<T> {
		if (withAuth) {
			config.headers = {
				...config.headers,
				...this.populeteTockenToHeaderConfig(),
			};
		}

		return this.fetchingService.get(
			this.getFullApiUrl(config.url),
			this.extractUrlAndDataFromConfig(config),
		);
	}

	post<T>(config: IHttpServicesConfig, withAuth: boolean = true): Promise<T> {
		if (withAuth) {
			config.headers = {
				...config.headers,
				...this.populeteTockenToHeaderConfig(),
			};
		}

		return this.fetchingService.post(
			this.getFullApiUrl(config.url),
			config.data,
			this.extractUrlAndDataFromConfig(config),
		);
	}

	putch<T>(
		config: IHttpServicesConfig,
		withAuth: boolean = true,
	): Promise<T> {
		if (withAuth) {
			config.headers = {
				...config.headers,
				...this.populeteTockenToHeaderConfig(),
			};
		}

		return this.fetchingService.patch(
			this.getFullApiUrl(config.url),
			config.data,
			this.extractUrlAndDataFromConfig(config),
		);
	}

	delete<T>(
		config: IHttpServicesConfig,
		withAuth: boolean = true,
	): Promise<T> {
		if (withAuth) {
			config.headers = {
				...config.headers,
				...this.populeteTockenToHeaderConfig(),
			};
		}

		return this.fetchingService.delete(
			this.getFullApiUrl(config.url),
			this.extractUrlAndDataFromConfig(config),
		);
	}
}

export default HttpServices;
