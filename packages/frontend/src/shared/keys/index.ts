// Backend Routes
export const BACKEND_KEYS = {
	SERVER_URL: 'http://127.0.0.1:3000',
	TODOS: {
		ROOT: 'todos/all',
		CREATE: 'todos/create',
		UPDATE: (todoId?: number): string => `todos/update/${todoId}`,
		DELETE: (todoId?: number): string => `todos/delete/${todoId}`,
	},
	AUTH: {
		REG: 'user/register',
		LOGIN: 'user/login',
		LOGOUT: 'user/login',
		REQ_RESET_PASS: 'user/request-reset-password',
		RESET_PASS: 'user/reset-password',
		USER: 'user',
	},
};

export const ROUTER_KEYS = {
	HOME: '/home',
	TODO: {
		CREATE: '/todo/create',
	},
	AUTH: {
		ROOT: '/auth',
		LOGIN: '/auth/login',
		SIGN_UP: '/auth/register',
		REQ_RESET_PASSWORD: '/request-reset-password',
		RESET_PASSWORD: '/reset-password',
	},
};

export const ERRORS = {
	USER_EXIST: 'User already exist',
	USER_NOT_EXIST: 'User not exist, create account',
	INCORRECT_PASSWORD: 'Incorrect password',
	TOKEN_EXPIRED: 'Token expired',
	UNAUTHORIZED: 'Please login',
	ACCOUNT_NOT_ACTIVE: 'Check your email for activation mail',
};

export const STORAGE_KEYS = Object.freeze({
	TOKEN: 'TOKEN',
});
