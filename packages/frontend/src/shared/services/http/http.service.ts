import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { $protectedApi } from '~shared/api/protectedApi.instance';
import { $publicApi } from '~shared/api/publicApi.instance';

interface HttpServiceConfig {
	url: string;
	data?: unknown;
	headers?: Record<string, string>;
	params?: Record<string, string>;
}

interface HttpServiceOptions {
	config: HttpServiceConfig;
	withAuth?: boolean;
}

class HttpService {
	private fetchingServicePublic: AxiosInstance;
	private fetchingServicePrivate: AxiosInstance;

	constructor(
		fetchingServicePublic: AxiosInstance = $publicApi,
		fetchingServicePrivate: AxiosInstance = $protectedApi,
	) {
		this.fetchingServicePublic = fetchingServicePublic;
		this.fetchingServicePrivate = fetchingServicePrivate;
	}

	private populateTokenToHeaderConfig(): { Authorization: string | null } {
		return {
			Authorization: localStorage.getItem('token') || null,
		};
	}

	private applyAuthHeaders(
		headers: Record<string, string> = {},
	): Record<string, string> {
		if (localStorage.getItem('token')) {
			return {
				...headers,
				...this.populateTokenToHeaderConfig(),
			};
		}
		return headers;
	}

	private extractUrlAndDataFromConfig(
		config: HttpServiceConfig,
	): AxiosRequestConfig {
		const { url, data, headers, params } = config;
		return {
			url,
			data,
			headers: this.applyAuthHeaders(headers),
			params,
		};
	}

	private getFetchingService(withAuth: boolean): AxiosInstance {
		return withAuth
			? this.fetchingServicePrivate
			: this.fetchingServicePublic;
	}

	private async request<T>(
		method: 'get' | 'post' | 'put' | 'patch' | 'delete',
		options: HttpServiceOptions,
	): Promise<AxiosResponse<T>> {
		const { config, withAuth = false } = options;
		const axiosInstance = this.getFetchingService(withAuth);
		const requestConfig = this.extractUrlAndDataFromConfig(config);
		return axiosInstance[method]<T>(
			config.url,
			method === 'get' || method === 'delete'
				? { params: requestConfig.params }
				: requestConfig.data,
			requestConfig,
		);
	}

	get<T>(options: HttpServiceOptions): Promise<AxiosResponse<T>> {
		return this.request<T>('get', options);
	}

	post<T>(options: HttpServiceOptions): Promise<AxiosResponse<T>> {
		return this.request<T>('post', options);
	}

	put<T>(options: HttpServiceOptions): Promise<AxiosResponse<T>> {
		return this.request<T>('put', options);
	}

	patch<T>(options: HttpServiceOptions): Promise<AxiosResponse<T>> {
		return this.request<T>('patch', options);
	}

	delete<T>(options: HttpServiceOptions): Promise<AxiosResponse<T>> {
		return this.request<T>('delete', options);
	}
}

export default HttpService;
