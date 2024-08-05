import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class HttpService {
	private baseUrl: string;
	private fetchingService: AxiosInstance;

	constructor(
		baseUrl: string = process.env.REACT_APP_API_BASE_URL as string,
	) {
		this.baseUrl = baseUrl;
		this.fetchingService = axios.create({ baseURL: this.baseUrl });
	}

	private extractConfig(config: AxiosRequestConfig): AxiosRequestConfig {
		const { url: _url, data: _data, ...rest } = config;
		return rest;
	}

	public get<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.fetchingService.get<T>(
			config.url as string,
			this.extractConfig(config),
		);
	}

	public post<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.fetchingService.post<T>(
			config.url as string,
			config.data,
			this.extractConfig(config),
		);
	}

	public put<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.fetchingService.put<T>(
			config.url as string,
			config.data,
			this.extractConfig(config),
		);
	}

	public delete<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.fetchingService.delete<T>(
			config.url as string,
			this.extractConfig(config),
		);
	}
}

export default HttpService;
