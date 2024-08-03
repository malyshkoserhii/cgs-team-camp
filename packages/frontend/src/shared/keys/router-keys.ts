export const enum ROUTER_KEYS {
	ALL_MATCH = '/*',
	LOGIN = '/login',
	REGISTER = '/REGISTER',
	DASHBOARD = '/dashboard',
	CHANGE_PASSWORD = '/change-password',
	RESET_PASSWORD = '/reset-password',
}

export const STORAGE_KEYS = Object.freeze({
	TOKEN: 'TOKEN',
	AUTH_PERSIST: 'AUTH',
});
