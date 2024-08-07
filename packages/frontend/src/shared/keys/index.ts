export const enum ROUTER_KEYS {
	ALL_MATCH = '/*',
	LOGIN = '/login',
	SIGNUP = '/signup',
	VERIFY = '/verify/:token',
	TODO = '/todos',
	NEW = '/todos/new',
	EDIT = '/todos/edit/:id',
	CHANGE_PASSWORD = '/change-password',
	FORGOT_PASSWORD = '/forgot-password',
	RESET_PASSWORD = '/reset-password/:token',
	CHANGE_NAME = '/change-name',
}

export enum FILTER_TYPES {
	ALL = 'ALL',
	PRIVATE = 'PRIVATE',
	PUBLIC = 'PUBLIC',
	COMPLETED = 'COMPLETED',
}

export const STORAGE_KEYS = Object.freeze({
	TOKEN: 'TOKEN',
});
