import axios from 'axios';

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
		apiVersion = 'api',
	) {
		this.baseUrl = baseUrl;
		this.fetchingService = fetchingService;
		this.apiVersion = apiVersion;
	}

	private getFullApiUrl(url: string): string {
		return `${this.baseUrl}/${this.apiVersion}/${url}`;
	}

	private populeteTockenToHeaderConfig(): { Authorization: string | null } {
		// винести в змінну ключ для локал стору
		return {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		};
	}

	private extractUrlAndDataFromConfig(
		congig: IHttpServicesConfig,
	): Omit<IHttpServicesConfig, 'url' | 'data'> {
		const { url: _url, data: _data, ...configWithoutDataAndUrl } = congig;
		return configWithoutDataAndUrl;
	}

	// check return type
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
}

export default HttpServices;
