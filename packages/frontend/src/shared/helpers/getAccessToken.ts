import { STORAGE_KEYS } from '~shared/keys';
import { toast } from 'react-toastify';

export const getAccessToken = (): string => {
	const tokenString = localStorage.getItem(STORAGE_KEYS.AUTH_PERSIST);
	let token = '';
	if (tokenString) {
		try {
			const tokenObject = JSON.parse(tokenString);
			token = tokenObject?.state?.user?.user?.accessToken || '';
		} catch (error) {
			toast.error('Error parsing token from localStorage');
		}
	}
	return token;
};
