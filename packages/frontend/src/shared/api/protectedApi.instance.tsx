import axios, { AxiosError } from 'axios';
import { STORAGE_KEYS } from '~shared/const/keys.const';
import userService from '~shared/services/http/user.service';
import { notificationService } from '~shared/services/notificationService';
import { storageApi } from '~shared/services/storage/storage';

const $protectedApi = axios.create({
	baseURL: `${import.meta.env.VITE_SERVER_URL}`,
});

$protectedApi.interceptors.request.use(
	async (config) => {
		const accessToken = storageApi.get(STORAGE_KEYS.TOKEN);
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

$protectedApi.interceptors.response.use(
	(response) => {
		return response.data;
	},
	async (error) => {
		const request = error?.config;
		const accessToken = storageApi.get(STORAGE_KEYS.TOKEN);
		if (error.response.status === 401 && !request._prev && accessToken) {
			request._prev = true;
			try {
				await userService.refresh();
				return $protectedApi(request);
			} catch (axiosError) {
				const error = axiosError as AxiosError<{
					[x: string]: string;
				}>;
				notificationService.error(error?.response?.data?.error);
			}
		}
		if (!accessToken) {
			return Promise.reject(error);
		}
		notificationService.error(error.response.data.error);
		return Promise.reject(error);
	},
);

export { $protectedApi };
