import axios, { AxiosResponse, AxiosError } from 'axios';

import { errorHandler } from '~/utils/errorHandler';

export class HttpService {
	baseUrl: string;

	constructor(baseUrl = process.env.SERVER_URL) {
		this.baseUrl = baseUrl;
	}

	private getFullApiUrl(apiRoute: string): string {
		return `${this.baseUrl}/${apiRoute}`;
	}

	private populateTokenToHeaderConfig(): { Authorization: string } {
		return {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		};
	}

	private handleRequest<T>(request: Promise<AxiosResponse<T>>): Promise<T> {
		return request
			.then((response) => response.data)
			.catch((error: AxiosError) => {
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
			axios.get(this.getFullApiUrl(config.apiRoute), {
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
			axios.post(this.getFullApiUrl(config.apiRoute), config.data, {
				headers: config.headers,
			}),
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
			axios.put(this.getFullApiUrl(config.apiRoute), config.data, {
				headers: config.headers,
			}),
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
			axios.delete(this.getFullApiUrl(config.apiRoute), {
				headers: config.headers,
			}),
		);
	}
}
