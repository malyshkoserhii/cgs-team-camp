import axios from 'axios';

const $publicApi = axios.create({
	baseURL: `${import.meta.env.VITE_SERVER_URL}`,
});

$publicApi.interceptors.response.use(
	(response) => {
		return response.data;
	},
	async (error) => {
		console.log(error.response.data.message);
		return Promise.reject(error);
	},
);

export { $publicApi };