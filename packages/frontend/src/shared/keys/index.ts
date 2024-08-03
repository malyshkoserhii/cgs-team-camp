export const enum ROUTER_KEYS {
	ALL_MATCH = '/*',
	LOGIN = '/login',
	DASHBOARD = '/dashboard',
}

export const STORAGE_KEYS = Object.freeze({
	TOKEN: 'TOKEN',
});

export const API_KEYS = {
	ALL: 'todos/all',
	CREATE: 'todos/create',
	BY_ID: (id: string): string => `todos/todo/${id}`,
};
