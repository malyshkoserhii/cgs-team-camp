import axios from 'axios';

const $protectedApi = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}`,
});

$protectedApi.interceptors.request.use();

$protectedApi.interceptors.response.use();

export { $protectedApi };