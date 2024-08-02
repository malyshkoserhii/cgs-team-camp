import axios from 'axios';
import { STORAGE_KEYS } from '~shared/const/keys.const';
import { storageApi } from '~shared/services/storage/storage';

const $refreshApi = axios.create({
	baseURL: `${import.meta.env.VITE_SERVER_URL}`,
});

$refreshApi.interceptors.request.use(
	async (config) => {
		const refreshToken = storageApi.get(STORAGE_KEYS.TOKEN_REFRESH);
		if (refreshToken) {
			config.headers.Authorization = `Bearer ${refreshToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

$refreshApi.interceptors.response.use((response) => {
	return response.data;
});

export { $refreshApi };
