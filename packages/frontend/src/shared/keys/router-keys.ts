export const enum ROUTER_KEYS {
	ALL_MATCH = '/*',
	ADD_TODO = '/add-todo',
	EDIT_TODO = '/edit-todo',
	TODO = '/todo',
	DASHBOARD = '/',
	LOGIN = '/login',
	REGISTER = '/register',
	CHANGE_PASSWORD = '/change-password',
	RESET_PASSWORD = '/reset-password',
}

export const STORAGE_KEYS = Object.freeze({
	TOKEN: 'TOKEN',
	AUTH_PERSIST: 'AUTH',
});
