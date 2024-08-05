import axios, {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosError,
	InternalAxiosRequestConfig,
} from 'axios';

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
}

export class HttpService {
	private axiosInstance: AxiosInstance;

	constructor(baseURL: string) {
		this.axiosInstance = axios.create({
			baseURL,
		});

		this.axiosInstance.interceptors.request.use(
			(config) => {
				const token = localStorage.getItem('accessToken');
				if (token) {
					config.headers['Authorization'] = `Bearer ${token}`;
				}
				return config;
			},
			(error) => Promise.reject(error),
		);

		this.axiosInstance.interceptors.response.use(
			(response) => response,
			async (error: AxiosError) => {
				const originalRequest =
					error.config as ExtendedAxiosRequestConfig;
				if (error.response?.status === 401 && !originalRequest._retry) {
					originalRequest._retry = true;
					try {
						const refreshToken =
							localStorage.getItem('refreshToken');
						const response = await axios.post(
							`${baseURL}/user/refresh-token`,
							{ refreshToken },
						);
						const { accessToken } = response.data;
						localStorage.setItem('accessToken', accessToken);
						if (originalRequest.headers) {
							originalRequest.headers['Authorization'] =
								`Bearer ${accessToken}`;
						}
						return this.axiosInstance(originalRequest);
					} catch (refreshError) {
						localStorage.removeItem('accessToken');
						localStorage.removeItem('refreshToken');
						window.location.href = '/login';
						return Promise.reject(refreshError);
					}
				}
				return Promise.reject(error);
			},
		);
	}

	async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.axiosInstance.get<T>(url, config);
		return response.data;
	}

	async post<T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<T> {
		const response = await this.axiosInstance.post<T>(url, data, config);
		return response.data;
	}

	async put<T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<T> {
		const response = await this.axiosInstance.put<T>(url, data, config);
		return response.data;
	}

	async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.axiosInstance.delete<T>(url, config);
		return response.data;
	}
}
