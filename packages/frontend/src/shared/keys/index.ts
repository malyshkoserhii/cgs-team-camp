export const enum ROUTER_KEYS {
	ALL_MATCH = '/*',
	LOGIN = '/login',
	DASHBOARD = '/dashboard',
	ADD_NEW = '/add',
	VIEW = '/view/:id',
}

export const STORAGE_KEYS = Object.freeze({
	TOKEN: 'TOKEN',
});

export const API_KEYS = {
	ALL: 'todos/all',
	CREATE: 'todos/create',
	BY_ID: (id: string): string => `todos/todo/${id}`,
};
