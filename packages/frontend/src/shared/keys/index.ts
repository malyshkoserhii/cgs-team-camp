export const enum ROUTER_KEYS {
	ALL_MATCH = '/*',
	HOME = '/',
	LOGIN = '/login',
	REGISTER = '/register',
	DASHBOARD = '/dashboard',
	CREATETOD = '/dashboard/create',
	EDITTODO = '/dashboard/edit/:id',
	USER_PROFILE = '/user/profile',
	VERIFY_EMAIL = '/user/verify/:id',
	RESET_PASSWORD = '/user/reset-password/:id',
	FOGET_PASSWORD = '/user/foget-password',
}

export const STORAGE_KEYS = Object.freeze({
	TOKEN: 'TOKEN',
});
