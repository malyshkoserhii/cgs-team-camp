import { STORAGE_KEYS } from '~shared/const/keys.const';
import { TokenI } from '~shared/interfaces/user.interface copy';
import { storageApi } from '~shared/services/storage/storage';

export const setTokens = (tokens: TokenI): void => {
	storageApi.set(STORAGE_KEYS.TOKEN, tokens.accessToken);
	storageApi.set(STORAGE_KEYS.TOKEN_REFRESH, tokens.refreshToken);
};
