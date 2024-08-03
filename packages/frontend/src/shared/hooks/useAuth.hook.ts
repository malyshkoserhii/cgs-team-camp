import { STORAGE_KEYS } from '~shared/const/keys.const';
import { UserI } from '~shared/interfaces/user.interface copy';
import { storageApi } from '~shared/services/storage/storage';
import { useUserStore } from '~store/user.store';

export const useAuth = (): {
	isAuth: boolean;
	shouldRedirect: boolean;
	token: string;
	currentLoading: boolean;
	user: UserI;
} => {
	const { user, currentLoading } = useUserStore();
	const token = storageApi.get(STORAGE_KEYS.TOKEN);
	const isAuth = Boolean(token) && Boolean(user);
	const shouldRedirect = !isAuth && !currentLoading;

	return { isAuth, shouldRedirect, token, currentLoading, user };
};
