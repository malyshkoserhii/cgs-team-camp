export const enum ROUTER_KEYS {
	ALL_MATCH = '/*',
	DASHBOARD = '/',
	CREATE_TODO = '/create',
	LOGIN = '/login',
	REGISTER = '/register',
	CHANGE_PASSWORD = '/change-password',
	RESET_PASSWORD = '/reset-password',
}

export const STORAGE_KEYS = Object.freeze({
	TOKEN: 'TOKEN',
	THEME: 'theme',
});
