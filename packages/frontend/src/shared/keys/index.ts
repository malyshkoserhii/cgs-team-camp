export const enum ROUTER_KEYS {
	ALL_MATCH = '/*',
	AUTH = '/auth',
	LOGIN = '/login',
	REGISTER = '/sign-up',
	RESET_PASSWORD = '/reset-password',
	FORGOT_PASSWORD = '/forgot-password',
	VERIFY_EMAIL = '/verify-email',
	DASHBOARD = '/dashboard',
	TODO = '/todo',
	PROFILE = '/profile',
}

export const STORAGE_KEYS = Object.freeze({
	ACCESS_TOKEN: 'ACCESS_TOKEN',
	REFRESH_TOKEN: 'REFRESH_TOKEN',
});
