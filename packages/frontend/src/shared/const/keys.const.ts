export const enum ROUTER_KEYS {
	ALL_MATCH = '/*',
	DASHBOARD = '/',
	CREATE_TODO = '/create',
	LOGIN = '/login',
	REGISTER = '/register',
	CHANGE_PASSWORD = '/change-password',
	CHANGE_PASSWORD_CONFIRM = '/change-password-confirm',
	ACTIVATE_ACCOUNT = '/activate',
}

export const STORAGE_KEYS = Object.freeze({
	TOKEN: 'TOKEN',
	TOKEN_REFRESH: 'TOKEN_REFRESH',
	THEME: 'theme',
});
