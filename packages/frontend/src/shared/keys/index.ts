export const enum ROUTER_KEYS {
	ALL_MATCH = '/*',
	LOGIN = '/login',
	DASHBOARD = '/dashboard',
	TODO = '/todos',
	NEW = '/todos/new',
	EDIT = '/todos/edit/:id',
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
