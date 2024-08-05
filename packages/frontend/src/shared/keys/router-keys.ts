export const enum ROUTER_KEYS {
	ALL_MATCH = '/*',
	LOGIN = '/login',
	REGISTER = '/register',
	DASHBOARD = '/dashboard',
	CHANGE_PASSWORD = '/change-password',
	RESET_PASSWORD = '/reset-password',
	VERIFY_EMAIL = '/verify/:id',
}

export const STORAGE_KEYS = Object.freeze({
	TOKEN: 'TOKEN',
	AUTH_PERSIST: 'AUTH',
});
