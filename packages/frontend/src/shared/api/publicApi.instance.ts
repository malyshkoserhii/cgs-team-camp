import axios from 'axios';
import { notificationService } from '~shared/services/notificationService';

const $publicApi = axios.create({
	baseURL: `${import.meta.env.VITE_SERVER_URL}`,
});

$publicApi.interceptors.response.use(
	(response) => {
		return response.data;
	},
	async (error) => {
		notificationService.error(error.response.data.error);
		return Promise.reject(error);
	},
);

export { $publicApi };
