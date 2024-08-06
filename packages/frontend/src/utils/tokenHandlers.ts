import { STORAGE_KEYS } from '~shared/keys';

export const setToken = (key: string, token: string) =>
	localStorage.setItem(key, token);

export const getToken = (key) => localStorage.getItem(key);

export const clearTokens = () => {
	localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
	localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
};
