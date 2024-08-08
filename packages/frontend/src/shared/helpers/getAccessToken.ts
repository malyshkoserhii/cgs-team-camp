import { STORAGE_KEYS } from '~shared/keys';

export const getToken = (): string => {
	const tokenString = localStorage.getItem(STORAGE_KEYS.AUTH_PERSIST);
	let token = '';
	if (tokenString) {
		try {
			const tokenObject = JSON.parse(tokenString);
			token = tokenObject?.state?.user?.user?.accessToken || '';
		} catch (error) {
			console.error('Error parsing token from localStorage', error);
		}
	}
	return token;
};
