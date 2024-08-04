export const enum ROUTER_KEYS {
	ALL_MATCH = '/*',
	HOME = '/',
	LOGIN = '/login',
	REGISTER = '/register',
	DASHBOARD = '/dashboard',
	CREATETOD = '/dashboard/create',
	EDITTODO = '/dashboard/edit/:id',
}

export const STORAGE_KEYS = Object.freeze({
	TOKEN: 'TOKEN',
});
